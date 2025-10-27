// src/pages/HomePage.js
import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { items, isLoading } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  
  const categories = ['All', 'Books', 'Electronics', 'Lab Equipment', 'Bicycle', 'Other'];
  const sortOptions = ['Newest', 'Oldest', 'Budget: Low to High', 'Budget: High to Low'];
  
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    // Helper function to parse budget string (e.g., '₹500') into a number
    const parseBudget = (budgetStr) => parseInt(String(budgetStr).replace('₹', ''), 10) || 0;

    switch (sortOrder) {
      case 'Oldest':
        // FIX: Sort by createdAt date
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'Budget: Low to High':
        return parseBudget(a.budget) - parseBudget(b.budget);
      case 'Budget: High to Low':
        return parseBudget(b.budget) - parseBudget(a.budget);
      case 'Newest':
      default:
        // FIX: Sort by createdAt date (descending)
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Find What You Need, Share What You Have</h2>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Dropdown onSelect={(eventKey) => setSelectedCategory(eventKey)}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-category">
            Category: <span className="fw-bold">{selectedCategory}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map(category => (
              <Dropdown.Item key={category} eventKey={category}>{category}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown onSelect={(eventKey) => setSortOrder(eventKey)}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
            Sort By: <span className="fw-bold">{sortOrder}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortOptions.map(option => (
              <Dropdown.Item key={option} eventKey={option}>{option}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row className="gy-4">
        {sortedAndFilteredItems.length > 0 ? (
          sortedAndFilteredItems.map(item => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <ItemCard item={item} />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No items found. Be the first to post!</p>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default HomePage;