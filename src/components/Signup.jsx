import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {customFetch} from "../utils/customFetch";
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
    const error = {};

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      error.passwordConfirm = "Passwords do not match.";
    }

    if (passwordRef.current.value.length < 6) {
      error.password = "Password must be at least 6 characters.";
    }

    if (usernameRef.current.value.length < 6) {
      error.username = "Username must be at least 6 characters.";
    }

    if (firstNameRef.current.value.length < 2) {
      error.firstName = "First name must be at least 2 characters.";
    }

    if (lastNameRef.current.value.length < 2) {
      error.lastName = "Last name must be at least 2 characters.";
    }

    if (dateOfBirthRef.current.value === "") {
      error.dateOfBirth = "Date of Birth is required.";
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
        error.username = "Username already taken.";
      }
      if (response.emailExists) {
        error.email = "Email already exists. Try different email or use forgot password.";
      }
    } catch (error) {
      console.error(error);
      error.general = error.message;
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      try {
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
      console.error(error);
      setError({ general: error.message });
    }
  }

  setLoading(false);
}

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center">Sign Up</h2>
            {error.general && <div className="alert alert-error">{error.general}</div>}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Repeated form elements are refactored for TailwindCSS and DaisyUI */}
              <div className="form-control">
              <label className="label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                required
                className={`input input-bordered ${error.email ? 'input-error' : ''}`}
              />
              {error.email && <label className="label text-error">{error.email}</label>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                required
                className={`input input-bordered ${error.username ? 'input-error' : ''}`}
              />
              {error.username && <label className="label text-error">{error.username}</label>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                ref={firstNameRef}
                required
                className={`input input-bordered ${error.firstName ? 'input-error' : ''}`}
              />
              {error.firstName && <label className="label text-error">{error.firstName}</label>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                ref={lastNameRef}
                required
                className={`input input-bordered ${error.lastName ? 'input-error' : ''}`}
              />
              {error.lastName && <label className="label text-error">{error.lastName}</label>}
            </div>
            <div class="form-control w-full">
                <label class="label" for="dateOfBirth">
                  <span class="label-text">Date of Birth</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  ref={dateOfBirthRef} // Use the ref object
                  required
                  className={`input input-bordered w-full mt-1 ${error.dateOfBirth ? 'input-error' : ''}`}
                />
                {error.dateOfBirth && <label className="label text-error">{error.dateOfBirth}</label>}
              </div>

              <div class="form-control w-full">
                <label class="label" for="password">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  ref={passwordRef} // Use the ref object
                  required
                  className={`input input-bordered w-full mt-1 ${error.password ? 'input-error' : ''}`}
                />
                {error.password && <label className="label text-error">{error.password}</label>}
              </div>

              <div class="form-control w-full">
                <label class="label" for="password-confirm">
                  <span class="label-text">Password Confirmation</span>
                </label>
                <input
                  type="password"
                  id="password-confirm"
                  ref={passwordConfirmRef} // Use the ref object
                  required
                  className={`input input-bordered w-full mt-1 ${error.passwordConfirm ? 'input-error' : ''}`}
                />
                {error.passwordConfirm && <label className="label text-error">{error.passwordConfirm}</label>}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary w-full"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">Log In</Link>
        </div>
      </div>
    </div>
  );
}
