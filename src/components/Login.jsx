import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import customFetch from "../utils/customFetch.js"
import { Endpoints } from "../utils/Endpoints"

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
        "firebaseID": token
      }
      const result = await customFetch(Endpoints.login, "POST", body, "")

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
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-3xl font-bold">Log In</h2>
            {error && <div className="alert alert-error shadow-lg">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              >
                Log In
              </button>
            </form>
            <div className="flex flex-col items-center justify-center mt-4">
              <Link to="/forgot-password" className="link link-primary">
                Forgot Password?
              </Link>
              <span>Need an account? <Link to="/signup" className="link link-primary">Sign Up</Link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
