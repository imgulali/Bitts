import React from 'react';
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
    <Card>
        <Card.Body className={"text-center"}>
          <h2 className="text-center mb-4">404</h2>
          <p >The link must've been broken</p>
          <Link to="/" className="btn btn-primary w-100 mt-3">
            Go To Home
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default NotFound