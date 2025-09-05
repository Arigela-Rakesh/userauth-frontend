import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;
    
    return {
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      hasMinLength,
      isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && hasMinLength
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email.endsWith('@gmail.com')) {
      setError('Email must be a Gmail address (@gmail.com)');
      setLoading(false);
      return;
    }

    if (!passwordValidation.isValid) {
      setError('Password does not meet all requirements');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/auth/register', formData);
      setUser(response.data.user);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className={`form-input ${formData.email && !formData.email.endsWith('@gmail.com') ? 'invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className={`form-input ${formData.password && !passwordValidation.isValid ? 'invalid' : ''}`}
          />
          {formData.password && (
            <div className="validation-info">
              <div className={`validation-item ${passwordValidation.hasMinLength ? 'valid' : 'invalid'}`}>
                ✓ At least 8 characters
              </div>
              <div className={`validation-item ${passwordValidation.hasUpperCase ? 'valid' : 'invalid'}`}>
                ✓ One uppercase letter
              </div>
              <div className={`validation-item ${passwordValidation.hasLowerCase ? 'valid' : 'invalid'}`}>
                ✓ One lowercase letter
              </div>
              <div className={`validation-item ${passwordValidation.hasNumbers ? 'valid' : 'invalid'}`}>
                ✓ One number
              </div>
              <div className={`validation-item ${passwordValidation.hasSpecialChar ? 'valid' : 'invalid'}`}>
                ✓ One special character
              </div>
            </div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading || !passwordValidation.isValid} className="submit-button">
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;