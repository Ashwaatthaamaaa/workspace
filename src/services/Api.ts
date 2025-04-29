import axios from "axios";

export const api = axios.create({
  baseURL: "https://dynamic-form-generator-9rl7.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
