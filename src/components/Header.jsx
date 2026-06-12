import React, { useState } from 'react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export default function Header({ onOpenAuth, activeTab, setActiveTab, currentUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'location', label: 'Location' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="header-left">
          <span className="logo-text" onClick={() => handleNavClick('home')}>
            {APP_CONFIG.company.toUpperCase()}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="header-desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`desktop-nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="header-right">
          {currentUser ? (
            <div className="user-profile-badge" title={`Signed in as ${currentUser}`}>
              <span className="profile-initial">{currentUser.charAt(0).toUpperCase()}</span>
            </div>
          ) : (
            <button 
              className="btn-sign-in" 
              onClick={onOpenAuth}
            >
              SIGN IN
            </button>
          )}

          {/* Mobile Hamburger */}
          <button
            className="header-hamburger"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        .app-header {
          background-color: var(--light-bg);
          border-bottom: 1px solid var(--border-light);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 12px rgba(0,0,0,0.04);
        }

        .header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          max-width: var(--content-max-width);
          margin: 0 auto;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo-text {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.5px;
          cursor: pointer;
          user-select: none;
        }

        /* Desktop Nav — hidden on mobile */
        .header-desktop-nav {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .desktop-nav-link {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 8px 18px;
          border-radius: 8px;
          transition: all var(--transition-fast);
          position: relative;
        }

        .desktop-nav-link:hover {
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .desktop-nav-link.active {
          color: var(--primary);
          font-weight: 700;
          background-color: var(--primary-light);
        }

        .desktop-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 3px;
          background-color: var(--primary);
          border-radius: 2px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-hamburger {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 8px;
          transition: background-color var(--transition-fast);
        }

        .header-hamburger:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .user-profile-badge {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: var(--secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          border: 2px solid var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .btn-sign-in {
          background-color: var(--primary);
          color: var(--text-white);
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .btn-sign-in:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
        }

        /* Mobile Nav Dropdown */
        .mobile-nav-dropdown {
          display: flex;
          flex-direction: column;
          padding: 0 20px 16px;
          gap: 4px;
          background-color: var(--light-bg);
          border-bottom: 1px solid var(--border-light);
          animation: slideDown 0.25s ease forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-link {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 12px 16px;
          border-radius: 10px;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .mobile-nav-link:hover {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .mobile-nav-link.active {
          color: var(--primary);
          font-weight: 700;
          background-color: var(--primary-light);
        }

        /* ── Desktop (≥ 768px) ── */
        @media (min-width: 768px) {
          .header-inner {
            padding: 16px var(--content-padding);
          }

          .logo-text {
            font-size: 24px;
          }

          .header-desktop-nav {
            display: flex;
          }

          .header-hamburger {
            display: none;
          }

          .mobile-nav-dropdown {
            display: none;
          }

          .btn-sign-in {
            padding: 10px 24px;
            font-size: 13px;
          }
        }
      `}</style>
    </header>
  );
}
