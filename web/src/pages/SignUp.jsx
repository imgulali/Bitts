import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";


const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="confirmPass">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPassRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              SignUp
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  );
};

export default SignUp;
