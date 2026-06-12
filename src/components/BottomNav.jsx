import React from 'react';
import { Home, Utensils, MapPin } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'location', label: 'Location', icon: MapPin },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <div className="icon-wrapper">
              <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 72px;
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-light);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0 12px;
          z-index: 100;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.03);
        }

        .nav-item {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-secondary);
          cursor: pointer;
          flex: 1;
          height: 100%;
          transition: all var(--transition-fast);
          position: relative;
        }

        .icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          transition: all var(--transition-fast);
        }

        .nav-item:hover .icon-wrapper {
          background-color: rgba(244, 182, 28, 0.08);
          color: var(--secondary-hover);
        }

        .nav-item.active {
          color: var(--text-primary);
        }

        .nav-item.active .icon-wrapper {
          background-color: var(--secondary);
          color: var(--text-primary);
          box-shadow: 0 4px 10px rgba(244, 182, 28, 0.3);
        }

        .nav-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2px;
        }

        .nav-item.active .nav-label {
          font-weight: 700;
        }

        /* Hide bottom nav on desktop — navigation is in the header */
        @media (min-width: 768px) {
          .bottom-nav {
            display: none;
          }
        }

      `}</style>
    </nav>
  );
}
