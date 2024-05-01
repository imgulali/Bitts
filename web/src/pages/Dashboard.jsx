import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logoutUser } = useAuth();

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Name:</strong> {currentUser.name} <br />
          <strong>Email:</strong> {currentUser.email} <br />
          <strong>Phone:</strong>{" "}
          {currentUser.phone ? currentUser.phone : "Add a Phone Number"} <br />
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={logoutUser}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
