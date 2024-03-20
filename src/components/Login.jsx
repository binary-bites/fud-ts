import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import customFetch from "../customFetch";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );
      const firebaseUser = userCredential.user;
      const token = firebaseUser.uid;
      console.log("token", token);
      const body = {
        firebaseID: token,
      };
      const result = await customFetch(
        "http://localhost:4000/api/user/login",
        "POST",
        body,
        ""
      );
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
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <Card.Body>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Log In
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
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Button
                disabled={loading}
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </Form>
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-indigo-600">
                Forgot Password?
              </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="text-center mt-4">
          Need an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
