// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthForm.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Get the login function from our updated AuthContext
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    }
    return newErrors;
  };

  // The handleSubmit function is now async
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        // Call the async login function from the context
        await login({ 
            email: formData.email, 
            password: formData.password 
        });
        toast.success('Logged in successfully!');
        navigate('/'); // Redirect to homepage on success
      } catch (error) {
        // If the API call fails (e.g., invalid credentials), show an error toast
        const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
        toast.error(message);
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6} xl={5}>
            <div className="auth-card">
              <h2 className="text-center mb-4">Welcome Back!</h2>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" label="Remember me" />
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Log In
                  </Button>
                </div>
              </Form>
              <div className="mt-4 text-center">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;