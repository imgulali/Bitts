import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SignUpSchema } from "../validators/Users";
import { validate } from "../validators/Validate";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);
      setError("");

      if (formData.password !== formData.confirmPass) {
        setLoading(false);
        return setError("Passwords don't match");
      }
      const { validationError } = await validate(SignUpSchema, formData);
      if (validationError) {
        setLoading(false);
        return setError(validationError);
      }

      const error = await registerUser(formData);
      if (error) {
        setLoading(false);
        return setError(error);
      }

      setLoading(false);
      return navigate("/");
    } catch (error) {
      console.error(error);
    }
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
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group id="confirmPass">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPass"
                value={formData.confirmPass}
                onChange={handleChange}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={"/login"}>Login</Link>
      </div>
    </>
  );
};

export default SignUp;
