// src/pages/MyRequestsPage.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';

function MyRequestsPage() {
  const { items, currentUser, deleteItem } = useAuth();

  // THE FIX:
  // 1. We filter based on `item.user`, which is the user's ID string from the backend.
  // 2. We compare it to `currentUser._id`, which is the real MongoDB ID.
  const myItems = currentUser 
    ? items.filter(item => item.user === currentUser._id) 
    : [];

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2>My Posted Requests</h2>
        <p className="text-muted">Here you can manage all the items you have requested.</p>
      </div>

      <Row className="gy-4">
        {myItems.length > 0 ? (
          myItems.map(item => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <ItemCard
                item={item}
                showAdminControls={true}
                onDelete={deleteItem}
              />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            {currentUser ? (
              <p>You haven't posted any requests yet.</p>
            ) : (
              <p>Please log in to see your requests.</p>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default MyRequestsPage;