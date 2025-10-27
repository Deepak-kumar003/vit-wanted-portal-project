// src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5"> {/* mt-5 for margin-top */}
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-3 mb-md-0">
            &copy; {new Date().getFullYear()} Wanted Items Portal
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            Developed by our team
          </Col>
          <Col md={4} className="text-md-end">
            Contact: abcd@vitstudent.ac.in
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;