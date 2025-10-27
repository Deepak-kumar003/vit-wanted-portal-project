import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './CreatePostPage.css';

function CreatePostPage() {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    imageUrl: '', // NEW: Field for image URL
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { addItem } = useAuth();
  const categories = ['Books', 'Electronics', 'Lab Equipment', 'Bicycle', 'Other'];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData(prevData => ({ ...prevData, [name]: value }));
  };
  
  const handleFileChange = (event) => {
    setPostData(prevData => ({
      ...prevData,
      image: event.target.files[0],
    }));
  };

  // Validation function for the form
  const validateForm = () => {
    const newErrors = {};
    if (!postData.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!postData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (!postData.category) {
      newErrors.category = 'Please select a category.';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        await addItem({
          name: postData.title,
          description: postData.description,
          category: postData.category,
          budget: postData.budget ? `₹${postData.budget}` : '₹0',
          imageUrl: postData.imageUrl, // Pass the URL
        });
        toast.success('Your post has been submitted!');
        navigate('/');
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to create post.';
        toast.error(message);
      }
    }
  };

  return (
    <div className="create-post-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="create-post-card">
              <div className="text-center mb-5">
                <h2>Post a New "Wanted" Item</h2>
                <p className="text-muted">Fill out the details of the item you are looking for.</p>
              </div>
              
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="postTitle">
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="e.g., 'Looking for a used scientific calculator'"
                    size="lg"
                    value={postData.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="postDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Provide details like model, condition, or specific requirements."
                    value={postData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="postCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={postData.category}
                        onChange={handleChange}
                        isInvalid={!!errors.category}
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
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
                          placeholder="e.g., 500"
                          value={postData.budget}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4" controlId="postImageUrl">
                  <Form.Label>Image URL (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="imageUrl"
                    placeholder="e.g., https://i.imgur.com/your-image.png"
                    value={postData.imageUrl}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Upload an image to a site like <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer">Imgur</a> and paste the direct image link here.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid mt-4">
                  <Button variant="primary" type="submit" size="lg">
                    Submit Post
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

export default CreatePostPage;