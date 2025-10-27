import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';
import SignUpPage from './pages/SignUpPage'; 
import MyRequestsPage from './pages/MyRequestsPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import { AuthProvider } from './context/AuthContext';
import EditPostPage from './pages/EditPostPage';
import MyOffersPage from './pages/MyOffersPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
    <Router>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <div className="App d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/item/:itemId" element={<ItemDetailsPage />} />
            <Route path="/my-requests" element={<MyRequestsPage />} />
            <Route path="/edit-post/:itemId" element={<EditPostPage />} />
            <Route path="/my-offers" element={<MyOffersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;