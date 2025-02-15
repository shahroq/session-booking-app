import { useState } from "react";

import { signupUser } from "../services/api";

import InputGroup from "./utils/InputGroup";
import Button from "./utils/Button";
import Alert from "./utils/Alert";

export default function RegistrationForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset error and success messages on each submit attempt
    setError("");
    setSuccess("");

    // For now, simply log the data; later we'll integrate with the API
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await signupUser(data);
      console.log("Registration successful:", result);
      setSuccess("Registration successful! You can now log in.");
      // Clear the form fields after successful registration
      event.target.reset();
    } catch (error) {
      console.error("Registration failed:", error);

      let errorMsg =
        "Registration failed. Please check your details and try again.";
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        backendErrors.forEach((err) => {
          errorMsg += `\n${err.msg}`;
        });
      }
      setError(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display error/success message if registration is (un)successful */}
      {error && (
        <Alert type="danger" title="Error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert type="success" title="success">
          {success}
        </Alert>
      )}

      <InputGroup
        name="name"
        type="name"
        label="Name"
        placeholder="Full name"
        required
      />
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

      <div className="mb-4">
        <label className="mr-2">
          <input type="radio" name="role" value="client" defaultChecked />{" "}
          Client
        </label>
        <label>
          <input type="radio" name="role" value="therapist" /> Therapist
        </label>
      </div>

      <div>
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}
