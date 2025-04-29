import React, { useState } from "react";
import { FormSection } from "../types";
import Field from "./Field";

const Section: React.FC<{
  section: FormSection;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: (data: any) => void;
  isLast: boolean;
}> = ({ section, onNext, onPrev, onSubmit, isLast }) => {
  const [sectionData, setSectionData] = useState({});
  const [errors, setErrors] = useState<string | null>(null);

  const validateSection = () => {
    return true; // Return true if valid, otherwise false
  };

  const handleNext = () => {
    if (validateSection()) {
      onNext();
    } else {
      setErrors("Please fix errors before proceeding.");
    }
  };

  const handleSubmit = () => {
    if (validateSection()) {
      onSubmit(sectionData);
    } else {
      setErrors("Please fix errors before submitting.");
    }
  };

  return (
    <div>
      <h2>{section.title}</h2>
      <p>{section.description}</p>
      {section.fields.map((field) => (
        <Field
          key={field.fieldId}
          field={field}
          onChange={(value) =>
            setSectionData({ ...sectionData, [field.fieldId]: value })
          }
        />
      ))}
      {errors && <p>{errors}</p>}
      <button onClick={onPrev} disabled={!onPrev}>
        Previous
      </button>
      {!isLast ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Section;
