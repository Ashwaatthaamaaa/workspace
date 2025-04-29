import React, { useState } from "react";
import { FormField } from "../types";

const FieldRenderer: React.FC<{
  field: FormField;
  value: any;
  onChange: (fieldId: string, value: any) => void;
}> = ({ field, value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validateField = (value: any): boolean => {
    if (field.required && !value) {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (validateField(newValue)) {
      onChange(field.fieldId, newValue);
    }
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
