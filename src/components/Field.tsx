import React from "react";
import { FormField } from "../types";

const Field: React.FC<{ field: FormField; onChange: (value: any) => void }> = ({
  field,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={field.fieldId}>{field.label}</label>
      {field.type === "text" && (
        <input
          id={field.fieldId}
          type="text"
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          minLength={field.minLength}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {/* Add other field types */}
    </div>
  );
};

export default Field;
