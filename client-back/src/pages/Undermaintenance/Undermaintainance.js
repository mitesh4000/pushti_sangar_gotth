// UnderMaintenance.js
import React from 'react';
import { Link } from 'react-router-dom';

const UnderMaintenance = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7', 
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff', 
  };

  const headingStyle = {
    color: '#e44d26', 
  };

  const textStyle = {
    color: '#333', 
    marginBottom: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', 
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Under Maintenance</h1>
        <p style={textStyle}>
          We apologize for the inconvenience. Our site is currently undergoing maintenance. Please check back later.
        </p>
        <Link to="/home" style={buttonStyle}>
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default UnderMaintenance;
