import { useState, useContext } from "react";
import { signinUser } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

import InputGroup from "./utils/InputGroup";
import Button from "./utils/Button";
import Alert from "./utils/Alert";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset error on each submit attempt
    setError("");

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await signinUser(data);
      console.log("Login successful:", result);
      // Save user data in context
      login(result);
      // Redirect based on role
      // if (result.role === "therapist") {
      //   navigate("/therapist");
      // } else {
      //   navigate("/client");
      // }
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="danger" title="Error">
          {error}
        </Alert>
      )}

      <InputGroup
        name="email"
        type="email"
        label="Email"
        placeholder="Email Address"
        required
      />
      <InputGroup
        name="password"
        type="password"
        label="Password"
        placeholder="*****"
        required
      />
      <div>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
