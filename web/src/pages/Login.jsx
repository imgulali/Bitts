import React, { useEffect, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../validators/Validate";
import { LoginSchema } from "../validators/Users";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, loginUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      const { validationError } = await validate(LoginSchema, formData);
      if (validationError) {
        setLoading(false);
        return setError(validationError);
      }

      const error= await loginUser(formData);
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
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Login
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

export default Login;
