import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import customFetch from '../customFetch';

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  // Example function using Axios to make a GET request
  const handleAxiosRequest = async () => {
    const url = "http://localhost:4000/api/post/create";
    const method = "POST"
    const body = {
      "title": "This is a test post",
      "content": "This is the content of the test post"
    }
    
    try {
      const token = await currentUser.getIdToken(true); // Force token refresh
      const result = await customFetch(url, method, body, token);
      console.log(result);
    } catch (error) {
      console.log(error);
    }

  };


  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          {/* Add a button for Axios request */}
          <Button className="mt-3" variant="primary" onClick={handleAxiosRequest}>Axios Request</Button>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
