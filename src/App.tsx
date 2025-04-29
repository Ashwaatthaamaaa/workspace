import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import FormRenderer from "./components/FormRenderer";

const App: React.FC = () => {
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  return (
    <div>
      {!rollNumber ? (
        <LoginForm onLoginSuccess={(rollNumber) => setRollNumber(rollNumber)} />
      ) : (
        <FormRenderer rollNumber={rollNumber} />
      )}
    </div>
  );
};

export default App;

//no the functionality is like this, if the user is logged in after that each rendered form field is rendered one by one assisted by prev and next buttons also getting validatied by the types.ts
