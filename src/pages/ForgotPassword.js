// frontend/src/pages/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: email, 2: reset, 3: success
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.forgotPassword({ email });
      setMessage(response.data.message);
      setStep(2);
      
      // For demo, show the token (remove in production)
      if (response.data.resetToken) {
        setMessage(`${response.data.message} Demo Token: ${response.data.resetToken}`);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending reset link');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await authAPI.resetPassword({ token: resetToken, newPassword });
      setMessage('Password reset successfully!');
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h2>Reset Password</h2>
      
      {message && (
        <div style={{ 
          padding: '0.75rem', 
          marginBottom: '1rem',
          borderRadius: '5px',
          backgroundColor: step === 3 ? '#d4edda' : '#fff3cd',
          border: step === 3 ? '1px solid #c3e6cb' : '1px solid #ffeaa7'
        }}>
          {message}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSendResetLink}>
          <p>Enter your email address and we'll send you a password reset link.</p>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Send Reset Link
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <p>Check your email for the reset token and enter your new password.</p>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Enter reset token"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
          </div>
          <button 
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#28a745',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reset Password
          </button>
        </form>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <p>Your password has been reset successfully!</p>
          <Link 
            to="/login"
            style={{
              display: 'inline-block',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '1rem'
            }}
          >
            Go to Login
          </Link>
        </div>
      )}

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;