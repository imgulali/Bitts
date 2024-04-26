import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPassRef.current.value) {
      return setError("Passwords don't match");
    }

    try {
      setLoading(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} value={user.name} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} value={user.email} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              UpdateProfile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdateProfile;
