import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { validate } from "../validators/Validate";
import { UpdateProfileSchema } from "../validators/Users";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    password: "",
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

      let updatedData = null;
      if (formData.name !== currentUser.name)
        updatedData = { ...updatedData, name: formData.name };
      if (formData.email !== currentUser.email)
        updatedData = { ...updatedData, email: formData.email };
      if (formData.phone !== currentUser.phone)
        updatedData = { ...updatedData, phone: formData.phone };
      if (formData.password !== "")
        updatedData = { ...updatedData, password: formData.password };

      if (!updatedData) {
        setLoading(false);
        return setError("Nothing has been changed");
      }

      const { validationError } = await validate(
        UpdateProfileSchema,
        updatedData
      );
      if (validationError) {
        setLoading(false);
        return setError(validationError);
      }

      const error = await updateUser(updatedData);
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
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                onChange={handleChange}
                value={formData.phone}
                placeholder="Leave blank to keep same"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Leave blank to keep same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default UpdateProfile;
