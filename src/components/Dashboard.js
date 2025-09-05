import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="user-info">
        <h3 className="welcome-text">Dashboard</h3>
        <p className="user-detail"><strong>Email:</strong> {user.email}</p>
        <p className="user-detail"><strong>User ID:</strong> {user.id}</p>
        <p className="user-detail"><strong>Account Status:</strong> Active</p>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/home" style={{ 
          padding: '12px 20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '8px',
          fontWeight: 'bold'
        }}>
          Back to Home
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;