import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home({ user, setUser }) {
  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const registrationDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Unknown';

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to UserAuth System</h1>
      
      <p className="welcome-message">
        🎉 Congratulations! You have successfully logged into our secure authentication system. 
        Your session is active and all your data is protected with industry-standard security measures.
      </p>

      <div className="user-info-card">
        <div className="user-email">📧 {user.email}</div>
        <div className="login-time">📅 Member since: {registrationDate}</div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔐</div>
          <div className="feature-title">Secure Authentication</div>
          <div className="feature-desc">JWT tokens with HTTP-only cookies</div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📧</div>
          <div className="feature-title">Gmail Validation</div>
          <div className="feature-desc">Only @gmail.com addresses allowed</div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <div className="feature-title">Strong Passwords</div>
          <div className="feature-desc">8+ chars with mixed requirements</div>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⏰</div>
          <div className="feature-title">Session Management</div>
          <div className="feature-desc">24-hour secure sessions</div>
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/dashboard" className="dashboard-button">
          View Dashboard
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;