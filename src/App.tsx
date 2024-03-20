import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExplorePage from "./components/ExplorePage";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import CreatePostPage from "./components/CreatePostPage";

function App() {
  return (
      <>
        <Router>
          <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<ExplorePage/>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<PrivateRoute><CreatePostPage/></PrivateRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
          </AuthProvider>
        </Router>
      </>
  );
}

export default App;
