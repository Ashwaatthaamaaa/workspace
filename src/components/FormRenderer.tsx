import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormResponse, FormField } from "../types";
import FieldRenderer from "./FieldRenderer";

const FormRenderer: React.FC<{ rollNumber: string }> = ({ rollNumber }) => {
  const [form, setForm] = useState<FormResponse["form"] | null>(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
        );
        setForm(response.data.form);
      } catch (e) {
        setError("Failed to fetch the form structure.");
      }
    };
    fetchForm();
  }, [rollNumber]);

  const getCurrentField = (): FormField | null => {
    if (!form) return null;

    let fieldCounter = 0;
    for (const section of form.sections) {
      for (const field of section.fields) {
        if (fieldCounter === currentFieldIndex) {
          return field;
        }
        fieldCounter++;
      }
    }
    return null;
  };

  const validateField = (field: FormField, value: any): boolean => {
    if (field.required && (!value || value.trim() === "")) {
      setError(field.validation?.message || `${field.label} is required.`);
      return false;
    }
    if (field.minLength && value.length < field.minLength) {
      setError(field.validation?.message || `${field.label} is too short.`);
      return false;
    }
    if (field.maxLength && value.length > field.maxLength) {
      setError(field.validation?.message || `${field.label} is too long.`);
      return false;
    }
    setError(null); // Clear the error if validation passes
    return true;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setCollectedData((prev) => ({ ...prev, [fieldId]: value }));
    const currentField = getCurrentField();
    if (currentField) {
      const isValid = validateField(currentField, value);
      setIsNextDisabled(!isValid); // Disable the "Next" button if validation fails
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setCurrentFieldIndex((prev) => prev + 1);
      setIsNextDisabled(true); // Reset the "Next" button state for the next field
    }
  };

  const handlePrev = () => {
    setCurrentFieldIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Collected Form Data:", collectedData);
  };

  const currentField = getCurrentField();

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h1>{form.formTitle}</h1>
      {currentField && (
        <FieldRenderer
          field={currentField}
          value={collectedData[currentField.fieldId]}
          onChange={handleFieldChange}
        />
      )}
      <div>
        {currentFieldIndex > 0 && <button onClick={handlePrev}>Prev</button>}
        {currentFieldIndex <
        form.sections.reduce((sum, section) => sum + section.fields.length, 0) -
          1 ? (
          <button onClick={handleNext} disabled={isNextDisabled}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={isNextDisabled}>
            Submit
          </button>
        )}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FormRenderer;
