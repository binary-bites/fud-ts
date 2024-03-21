import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { Endpoints } from "../utils/Endpoints";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const dateOfBirthRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (usernameRef.current.value.length < 6) {
      return setError("Username must be at least 6 characters");
    }

    if (firstNameRef.current.value.length < 2 || lastNameRef.current.value.length < 2) {
      return setError("First and Last name must be at least 2 characters");
    }

    if (dateOfBirthRef.current.value === "") {
      return setError("Date of Birth is required");
    }

    try {
      const body = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
      };

      const result = await customFetch(Endpoints.check, "POST", body, "");
      console.log("RESPONSE", result);
      if (!result.ok) {
        throw new Error("Failed to check availability of username and email");
      }
      const response = await result.json();

      if (response.usernameExists) {
        return setError("Username already taken.");
      }
      if (response.emailExists) {
        return setError("Email already exists. Try different email or use forgot password.");
      }
    } catch (error) {
      console.error(error);
      return setError(error.message);
    }

    try {
      setError("");
      setLoading(true);
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      const firebaseUser = userCredential.user;
      const body = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        firebaseID: firebaseUser.uid,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        dateOfBirth: dateOfBirthRef.current.value,
      };

      const result = await customFetch(Endpoints.signup, "POST", body, "");
      console.log(result);
      if (result.ok) {
        const responseBody = await result.json();
        console.log(responseBody);
        navigate("/");
      } else {
        const responseBody = await result.json();
        console.log("error body", responseBody);
        throw new Error(responseBody.error);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-md">
          <Card.Body>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Sign Up
              </h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  ref={usernameRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={firstNameRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  ref={lastNameRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  ref={dateOfBirthRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Button
                disabled={loading}
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}