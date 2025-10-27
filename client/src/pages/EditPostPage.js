import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './CreatePostPage.css';

function EditPostPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { items, updateItem, currentUser } = useAuth();
  
  // Find the item to edit from the global state
  const itemToEdit = items.find(i => i._id === itemId);

  // State to hold the form data
  const [postData, setPostData] = useState(null);

  // useEffect runs when the component loads. We use it to pre-fill the form.
  useEffect(() => {
    if (itemToEdit) {
      setPostData({
        title: itemToEdit.name,
        description: itemToEdit.description,
        category: itemToEdit.category,
        budget: String(itemToEdit.budget).replace('₹', ''), // Remove '₹' for the input field
      });
    }
  }, [itemToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateItem(itemId, postData);
      toast.success('Post updated successfully!');
      navigate('/my-requests');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post.';
      toast.error(message);
    }
  };
  
  // Show a loading spinner while the data is being prepared
  if (!postData) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  
  // Basic security: check if the item belongs to the current user
  if (itemToEdit.userId !== currentUser?.id) {
      return (
          <Container className="my-5 text-center">
              <h2>Access Denied</h2>
              <p>You do not have permission to edit this post.</p>
          </Container>
      );
  }

  return (
    <div className="create-post-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="create-post-card">
              <div className="text-center mb-5">
                <h2>Edit Your "Wanted" Item</h2>
              </div>
              
              <Form onSubmit={handleSubmit}>
                {/* MODIFIED: The name of this input is 'name' to match the backend */}
                <Form.Group className="mb-4" controlId="postName">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    size="lg"
                    value={postData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="postDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={postData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="postCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={postData.category}
                        onChange={handleChange}
                        required
                      >
                         {/* We can reuse the categories from CreatePostPage but they should be defined here or imported */}
                        <option>Select a category</option>
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Lab Equipment">Lab Equipment</option>
                        <option value="Bicycle">Bicycle</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="postBudget">
                      <Form.Label>Your Budget (Optional)</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>₹</InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="budget"
                          value={postData.budget}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                
                <div className="d-grid mt-4">
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

export default EditPostPage;