// src/components/AppNavbar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AppNavbar.css'; // Make sure you have this CSS file

function AppNavbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // State to control the mobile navbar's expanded state
  const [expanded, setExpanded] = useState(false);

  const handleNavLinkClick = () => {
    // This will collapse the navbar after a link is clicked
    setExpanded(false);
  };

  const handleLogout = () => {
    handleNavLinkClick(); // Collapse navbar
    logout();
    navigate('/login');
  };

  return (
    <Navbar 
      expanded={expanded} 
      onToggle={() => setExpanded(prev => !prev)} 
      expand="lg" 
      bg="light" 
      className="shadow-sm px-3"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" onClick={handleNavLinkClick}>
          VIT Wanted Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* ms-auto pushes all nav items to the right */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>Home</Nav.Link>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/create-post" onClick={handleNavLinkClick}>Create Post</Nav.Link>
                <Nav.Link as={Link} to="/my-requests" onClick={handleNavLinkClick}>My Requests</Nav.Link>
                <Nav.Link as={Link} to="/my-offers" onClick={handleNavLinkClick}>My Offers</Nav.Link>

                <NavDropdown 
                  title={currentUser.name} 
                  id="basic-nav-dropdown" 
                  className="fw-medium ms-lg-2"
                  align="end" // Aligns the dropdown to the right
                >
                  <NavDropdown.Item as={Link} to="/profile" onClick={handleNavLinkClick}>Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" className="log-in-btn ms-lg-2 me-2 my-2 my-lg-0" onClick={handleNavLinkClick}>Log In</Button>
                <Button as={Link} to="/signup" className="sign-up-btn" onClick={handleNavLinkClick}>Sign Up</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;