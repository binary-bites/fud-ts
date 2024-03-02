import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import customFetch from "../customFetch"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const usernameRef = useRef()
  const dateOfBirthRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    if (usernameRef.current.value.length < 6) {
      return setError("Username must be at least 6 characters")
    }

    if (firstNameRef.current.value.length < 2 || lastNameRef.current.value.length < 2) {
      return setError("First and Last name must be at least 2 characters")
    }

    if (dateOfBirthRef.current.value === "") {
      return setError("Date of Birth is required")
    }

    try {
      const body = {
        "username": usernameRef.current.value,
        "email": emailRef.current.value
      };
    
      const result = await customFetch("http://localhost:4000/api/user/check", "POST", body, "");
      console.log("RESPONSE", result)
      if (!result.ok) {
        throw new Error("Failed to check availability of username and email")
      }
      const response = await result.json()

      if (response.usernameExists) {
        return setError("Username already taken.")
      } 
      if (response.emailExists) {
        return setError("Email already exists. Try another email or do forgot password. ")
      }
      
    } catch (error) {
      console.error(error);
      return setError(error.message);
    }

    try {
      setError("")
      setLoading(true)
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value)
      const firebaseUser = userCredential.user
      const body = {
        "username": usernameRef.current.value,
        "email":emailRef.current.value,
        "firebaseID":firebaseUser.uid,
        "firstName": firstNameRef.current.value,
        "lastName": lastNameRef.current.value,
        "dateOfBirth": dateOfBirthRef.current.value
      }

      const result = await customFetch("http://localhost:4000/api/user/signup", "POST", body, "")
      console.log(result)
      if (result.ok) {
        const responseBody = await result.json()
        console.log(responseBody)
        navigate("/")
      } else {
        const responseBody = await result.json()
        console.log("error body", responseBody)
        throw new Error(responseBody.error)
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up Fool</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required />
            </Form.Group>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group id="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" ref={dateOfBirthRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
