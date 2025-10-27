// src/pages/MyOffersPage.js
import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import offerService from '../services/offerService';
import { toast } from 'react-toastify';

function MyOffersPage() {
  const { items, currentUser } = useAuth();
  
  // State for this page
  const [myOffers, setMyOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to fetch the user's offers when the component loads
  useEffect(() => {
    const fetchMyOffers = async () => {
      try {
        if (currentUser?.token) {
          const data = await offerService.getMyOffers(currentUser.token);
          setMyOffers(data);
        }
      } catch (error) {
        toast.error("Could not fetch your offers.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOffers();
  }, [currentUser]); // Re-run if the user logs in/out

  // Helper function to find the item an offer belongs to
  const getItemForOffer = (itemId) => {
    return items.find(item => item._id === itemId);
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2>My Submitted Offers</h2>
        <p className="text-muted">Here is a history of all the offers you've made.</p>
      </div>

      {myOffers.length > 0 ? (
        <ListGroup variant="flush">
          {myOffers.map(offer => {
            const item = getItemForOffer(offer.item); // offer.item now holds the itemId
            return (
              <ListGroup.Item 
                key={offer._id} 
                className="d-flex justify-content-between align-items-start p-3 mb-2 shadow-sm rounded"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Offer on: <Link to={`/item/${item?._id}`}>{item?.name || 'Item no longer available'}</Link>
                  </div>
                  <p className="mt-2 mb-0">"{offer.message}"</p>
                </div>
                <Badge bg="primary" pill>
                  {offer.status}
                </Badge>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <div className="text-center">
          <p>You haven't made any offers yet.</p>
        </div>
      )}
    </Container>
  );
}

export default MyOffersPage;