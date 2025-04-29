import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC<{ onLoginSuccess: (rollNumber: string) => void }> = ({
  onLoginSuccess,
}) => {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          rollNumber,
          name,
        }
      );
      onLoginSuccess(rollNumber);
    } catch (e) {
      setError("Failed to register user. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;
