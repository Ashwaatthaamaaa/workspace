import React, { useState, useEffect } from "react";
import { FormField } from "../types";

const FieldRenderer: React.FC<{
  field: FormField;
  value: any;
  onChange: (fieldId: string, value: any) => void;
}> = ({ field, value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate the field whenever the value changes
    if (value) {
      validateField(value);
    }
  }, [value]);

  const validateField = (value: any): boolean => {
    if (field.required && (!value || value.trim() === "")) {
      setError(`${field.label} is required.`);
      return false;
    }
    if (field.minLength && value.length < field.minLength) {
      setError(
        `${field.label} must be at least ${field.minLength} characters.`
      );
      return false;
    }
    if (field.maxLength && value.length > field.maxLength) {
      setError(`${field.label} must be at most ${field.maxLength} characters.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const newValue = e.target.value;
    onChange(field.fieldId, newValue); // Update parent state
    validateField(newValue); // Validate input dynamically

    // Ensure no unexpected navigation occurs
    e.stopPropagation(); // Prevent event propagation
  };

  const renderFieldInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return (
          <input
            id={field.fieldId}
            type={field.type}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={handleChange}
          />
        );
      case "textarea":
        return (
          <textarea
            id={field.fieldId}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={handleChange}
          />
        );
      case "dropdown":
        return (
          <select
            id={field.fieldId}
            value={value || ""}
            onChange={(e) => handleChange(e as any)}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div id={field.fieldId}>
            {field.options?.map((option) => (
              <label key={option.value} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor={field.fieldId}>{field.label}</label>
      {renderFieldInput()}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FieldRenderer;
