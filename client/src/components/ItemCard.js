// src/components/ItemCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ItemCard.css';

function ItemCard({ item, showAdminControls = false, onDelete }) {
  const defaultItem = { _id: 0, name: 'No Item', description: '', category: '', budget: '', imageUrl: '', createdAt: new Date().toISOString() };
  const currentItem = item || defaultItem;

  // FIX: Format the date from createdAt
  const postedDate = new Date(currentItem.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Card className="item-card">
      {/* FIX: Use item.imageUrl and provide a placeholder */}
      <Card.Img 
        variant="top" 
        src={currentItem.imageUrl || `https://via.placeholder.com/400x250?text=${currentItem.name.replace(/\s/g, '+')}`} 
        alt={currentItem.name} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{currentItem.name}</Card.Title>
        <Card.Text className="item-meta">
          Category: {currentItem.category} | Budget: {currentItem.budget}
        </Card.Text>
        <Card.Text>
          {currentItem.description.substring(0, 70)}{currentItem.description.length > 70 ? '...' : ''}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
          {/* FIX: Show the formatted date */}
          <small className="text-muted">Posted: {postedDate}</small>
          <Link to={`/item/${currentItem._id}`}>
            <Button className="view-details-btn" size="sm">View Details</Button>
          </Link>
        </div>

        {showAdminControls && (
          <div className="d-flex justify-content-end gap-2 mt-2 pt-2 border-top">
            <Button as={Link} to={`/edit-post/${currentItem._id}`} variant="outline-secondary" size="sm">Edit</Button>
            <Button onClick={() => onDelete(currentItem._id)} variant="outline-danger" size="sm">Delete</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ItemCard;