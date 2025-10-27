import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import itemService from '../services/itemService';
import offerService from '../services/offerService';
import { toast } from 'react-toastify';
import './ItemDetailsPage.css';

function ItemDetailsPage() {
  const { itemId } = useParams();
  const { addOffer, currentUser } = useAuth();

  // State for this page's data
  const [item, setItem] = useState(null);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offerMessage, setOfferMessage] = useState('');

  // useEffect to fetch data when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [itemData, offersData] = await Promise.all([
          itemService.getItemById(itemId),
          offerService.getOffersForItem(itemId)
        ]);
        setItem(itemData);
        setOffers(offersData);
      } catch (error) {
        toast.error("Failed to load item details.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [itemId]); // Re-run if the item ID in the URL changes

  // Handler for submitting a new offer
  const handleOfferSubmit = async (event) => {
    event.preventDefault();
    if (!offerMessage.trim()) return;

    try {
      const newOffer = await addOffer({ itemId, message: offerMessage });
      setOffers(prevOffers => [newOffer, ...prevOffers]);
      setOfferMessage('');
      toast.success("Offer submitted!");
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit offer.';
      toast.error(message);
    }
  };

  // Loading state display
  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  // Item not found state display
  if (!item) {
    return (
      <Container className="my-5 text-center">
        <h2>Item not found!</h2>
      </Container>
    );
  }

  // Check if the current user is the owner of the post
  const isOwnPost = currentUser?._id === item.user;

  return (
    <div className="item-details-wrapper">
      <Container className="my-5">
        <Row>
          {/* Left Column: Item Image and Details */}
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className="item-details-card">
              <Image 
                src={item.imageUrl || `https://via.placeholder.com/600x400?text=${item.name.replace(/\s/g, '+')}`} 
                fluid rounded className="mb-4 item-image" 
              />
              <h1>{item.name}</h1>
              {/* FIX: Show formatted date */}
              <p className="item-meta">Posted by a user on {new Date(item.createdAt).toLocaleDateString()}</p>
              <hr />
              <p className="lead">{item.description}</p>
              <div className="item-specs">
                <div><strong>Category:</strong> {item.category}</div>
                <div><strong>Budget:</strong> {item.budget}</div>
              </div>
            </div>
          </Col>

          {/* Right Column: Offers and Make an Offer Form */}
          <Col lg={5}>
            <div className="offers-card mb-4">
              <h4 className="mb-3">Offers ({offers.length})</h4>
              {offers.length > 0 ? (
                offers.map(offer => (
                  <Card key={offer._id} className="mb-3 offer-item">
                    <Card.Body>
                      <Card.Text>"{offer.message}"</Card.Text>
                      {/* In a real app, you might fetch user details for the offer */}
                      <Card.Subtitle className="text-muted text-end">- A User</Card.Subtitle>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No offers yet. Be the first to make one!</p>
              )}
            </div>
            
            {currentUser && !isOwnPost && (
              <div className="offers-card">
                <h4 className="mb-3">Make an Offer</h4>
                <Form onSubmit={handleOfferSubmit}>
                  <Form.Group className="mb-3" controlId="offerMessage">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write your offer or message here..."
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="d-grid">
                    <Button variant="success" type="submit">Submit Offer</Button>
                  </div>
                </Form>
              </div>
            )}

            {!currentUser && (
                <div className="offers-card text-center">
                    <p>Please log in to make an offer.</p>
                </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ItemDetailsPage;