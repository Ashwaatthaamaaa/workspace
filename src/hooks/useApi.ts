import axios from "axios";

export const useApi = () => {
  const createUser = async (rollNumber: string, name: string) => {
    return axios.post(
      "https://dynamic-form-generator-9rl7.onrender.com/create-user",
      { rollNumber, name }
    );
  };

  const getForm = async (rollNumber: string) => {
    return axios.get(
      `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
    );
  };

  return { createUser, getForm };
};
