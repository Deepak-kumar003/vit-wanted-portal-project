// src/pages/EditProfilePage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './AuthForm.css'; // Reuse the auth form styles

function EditProfilePage() {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  // Pre-fill the form when the component loads
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        // In a real app, email would also come from currentUser
        email: currentUser.email || `${currentUser.name.toLowerCase()}@vitstudent.ac.in`,
      });
    }
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ name: formData.name, email: formData.email });
    toast.success('Profile updated successfully!');
    navigate('/profile');
  };

  return (
    <div className="auth-wrapper">
      <Container className="d-flex align-items-center justify-content-center">
        <Row className="justify-content-center w-100">
          <Col md={8} lg={6} xl={5}>
            <div className="auth-card">
              <h2 className="text-center mb-4">Edit Profile</h2>
              <Form onSubmit={handleSubmit} className="text-start">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>VIT Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditProfilePage;