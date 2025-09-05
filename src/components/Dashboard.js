import React from 'react';
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
        <h3 className="welcome-text">Welcome!</h3>
        <p className="user-detail"><strong>Email:</strong> {user.email}</p>
        <p className="user-detail"><strong>User ID:</strong> {user.id}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;