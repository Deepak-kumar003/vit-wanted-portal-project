// src/pages/ProfilePage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './ProfilePage.css';

function ProfilePage() {
  const { currentUser, deleteUserAccount } = useAuth(); // Get new delete function
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserAccount();
      navigate('/'); // Redirect to home after account deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete account.");
    }
  };

  if (!currentUser) {
    return (
      <Container className="my-5 text-center">
        <p>Please log in to view your profile.</p>
        <Button as={Link} to="/login">Log In</Button>
      </Container>
    );
  }

  return (
    <div className="profile-wrapper">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="profile-card">
              <Card.Body className="text-center">
                <Card.Title as="h2" className="mb-4">My Profile</Card.Title>
                <div className="profile-avatar mb-4">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="profile-name">{currentUser.name}</h3>
                {/* FIX: Show the user's actual email */}
                <p className="text-muted">{currentUser.email}</p>
                <hr />
                <Button as={Link} to="/edit-profile" variant="outline-primary" className="mt-3 me-2">
                  Edit Profile
                </Button>
                {/* NEW: Delete Profile Button */}
                <Button variant="outline-danger" className="mt-3" onClick={handleDelete}>
                  Delete Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;