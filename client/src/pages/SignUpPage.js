import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthForm.css';

function SignUpPage() {
  // State to hold the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // State to hold any validation error messages
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { register } = useAuth(); // The register function from AuthContext

  // Handles changes for all input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to validate all form fields before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    const emailRegex = /^[\w.-]+@(vitstudent\.ac\.in|vit\.ac\.in)$/;
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please use a valid VIT student or faculty email.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  // Handles the final form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      // If there are validation errors, update the state to show them
      setErrors(formErrors);
    } else {
      // If validation is successful, clear errors and try to register
      setErrors({});
      try {
        await register({ 
            name: formData.name, 
            email: formData.email, 
            password: formData.password 
        });
        toast.success('Registration successful! Welcome!');
        navigate('/'); // Redirect to homepage on success
      } catch (error) {
        // If the API call fails, show an error toast from the server
        const message = error.response?.data?.message || 'Registration failed. Please try again.';
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
              <h2 className="text-center mb-4">Create an Account</h2>
              <Form noValidate onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name" // Changed from fullName to name
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>VIT Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter VIT email"
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
                
                <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Sign Up
                  </Button>
                </div>
              </Form>
              <div className="mt-4 text-center">
                Already have an account? <Link to="/login">Log In</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default SignUpPage;