import React, { useState } from 'react';
import { X, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function AuthModal({ onClose, onLoginSuccess, addToast }) {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please fill out all fields.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
      addToast(activeTab === 'signin' ? 'Welcome back!' : 'Account registered successfully!', 'success');
      onClose();
    }, 1200);
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        {/* Header */}
        <div className="auth-modal-header">
          <h3>Himalayan Account</h3>
          <button className="btn-close-auth" onClick={onClose} aria-label="Close authentication window">
            <X size={18} />
          </button>
        </div>

        {/* Auth Tabs */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="authEmail">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-field-icon" />
              <input
                type="email"
                id="authEmail"
                placeholder="john@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label htmlFor="authPassword">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="authPassword"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {activeTab === 'signin' && (
            <span className="forgot-password-link">Forgot Password?</span>
          )}

          <button type="submit" className="btn-auth-submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Social logins */}
        <div className="social-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="social-auth-buttons">
          <button className="btn-social-auth" onClick={() => { onLoginSuccess('google-user@gmail.com'); addToast('Signed in via Google', 'success'); onClose(); }}>
            Google
          </button>
          <button className="btn-social-auth" onClick={() => { onLoginSuccess('facebook-user@gmail.com'); addToast('Signed in via Facebook', 'success'); onClose(); }}>
            Facebook
          </button>
        </div>
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-modal-container {
          background-color: var(--light-bg);
          border-radius: var(--border-radius-lg);
          border: 1px solid var(--border-light);
          width: 100%;
          max-width: 420px;
          padding: 28px;
          box-shadow: var(--shadow-lg);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .auth-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .auth-modal-header h3 {
          font-family: var(--font-serif);
          font-size: 18px;
          color: var(--text-primary);
        }

        .btn-close-auth {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color var(--transition-fast);
        }

        .btn-close-auth:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .auth-tabs {
          display: flex;
          background-color: #F8F7F4;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid var(--border-light);
          margin-bottom: 20px;
        }

        .auth-tab-btn {
          flex: 1;
          background: none;
          border: none;
          padding: 8px 0;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }

        .auth-tab-btn.active {
          background-color: #FFFFFF;
          color: var(--text-primary);
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }

        .auth-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .auth-form-group label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .auth-input-wrapper {
          display: flex;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 10px 12px;
          align-items: center;
          gap: 10px;
        }

        .auth-field-icon {
          color: var(--text-muted);
        }

        .auth-input-wrapper input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-primary);
        }

        .btn-toggle-password {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .forgot-password-link {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: var(--primary);
          text-align: right;
          cursor: pointer;
          margin-top: -4px;
        }

        .btn-auth-submit {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all var(--transition-fast);
          margin-top: 6px;
          box-shadow: 0 4px 10px rgba(156, 12, 23, 0.15);
        }

        .btn-auth-submit:hover {
          background-color: var(--primary-hover);
        }

        .social-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 16px 0;
          position: relative;
        }

        .social-divider::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background-color: var(--border-light);
          z-index: 1;
        }

        .social-divider span {
          background-color: var(--light-bg);
          padding: 0 10px;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          z-index: 2;
        }

        .social-auth-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .btn-social-auth {
          background-color: white;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 10px 0;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 12px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-social-auth:hover {
          border-color: var(--text-muted);
          color: var(--text-primary);
        }
      `}</style>
    </div>
  );
}
