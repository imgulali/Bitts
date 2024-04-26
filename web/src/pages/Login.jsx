import React, { useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
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
  )
}

export default Login