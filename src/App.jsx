import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';
import { APP_CONFIG } from './config/appConfig';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import MenuTab from './components/MenuTab';
import LocationTab from './components/LocationTab';
import DishDetailModal from './components/DishDetailModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDish, setSelectedDish] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  // ── Apply APP_CONFIG theme as CSS custom properties ──────────────────────
  useEffect(() => {
    const { theme } = APP_CONFIG;
    const root = document.documentElement;
    root.style.setProperty('--primary',         theme.primary);
    root.style.setProperty('--primary-dark',    theme.primaryDark);
    root.style.setProperty('--primary-hover',   theme.primaryLight);
    root.style.setProperty('--secondary',       theme.accent);
    root.style.setProperty('--secondary-hover', theme.secondary);
    root.style.setProperty('--light-bg',        theme.background);
    root.style.setProperty('--text-primary',    theme.text);
    root.style.setProperty('--text-secondary',  theme.textSecondary);
    root.style.setProperty('--border-light',    theme.border);
    root.style.setProperty('--color-error',     theme.error);
    root.style.setProperty('--color-success',   theme.success);
    root.style.setProperty('--color-warning',   theme.warning);
  }, []);

  // ── Toast helpers ─────────────────────────────────────────────────────────
  const addToast = (message, type = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLoginSuccess = (email) => setCurrentUser(email);

  // ── Tab router ────────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'home':     return <HomeTab setActiveTab={setActiveTab} addToast={addToast} />;
      case 'menu':     return <MenuTab onSelectDish={setSelectedDish} setActiveTab={setActiveTab} />;
      case 'location': return <LocationTab setActiveTab={setActiveTab} />;
      default:         return <HomeTab setActiveTab={setActiveTab} addToast={addToast} />;
    }
  };

  return (
    <div className="app-viewport">
      {/* Header */}
      <Header
        onOpenAuth={() => setShowAuthModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
      />

      {/* Page content */}
      <main className="app-content">
        {renderContent()}
      </main>

      {/* Bottom nav (mobile only) */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Dish detail modal */}
      {selectedDish && (
        <DishDetailModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}

      {/* Auth modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          addToast={addToast}
        />
      )}

      {/* Toast notifications */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast-card ${t.type}`}>
            {t.type === 'success' && <CheckCircle size={16} />}
            {t.type === 'error'   && <AlertCircle size={16} />}
            {t.type === 'info'    && <Info size={16} />}
            <span>{t.message}</span>
            <button className="btn-close-toast" onClick={() => removeToast(t.id)}>
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .toast-container {
          position: fixed;
          top: 80px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2000;
          pointer-events: none;
          max-width: 400px;
        }
        .toast-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #FFFFFF;
          border-radius: var(--border-radius-sm);
          padding: 12px 16px;
          box-shadow: var(--shadow-lg);
          border-left: 4px solid var(--text-muted);
          pointer-events: auto;
          animation: slideDownToast 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
          text-align: left;
        }
        .toast-card.success { border-left-color:#4CAF50; color:#2E7D32; background-color:#E8F5E9; }
        .toast-card.error   { border-left-color:#F44336; color:#C62828; background-color:#FFEBEE; }
        .toast-card.info    { border-left-color:#2196F3; color:#1565C0; background-color:#E3F2FD; }
        .toast-card span    { font-size:13px; font-weight:600; flex:1; }
        .btn-close-toast    { background:none; border:none; color:inherit; opacity:0.7; cursor:pointer; padding:0; display:flex; align-items:center; }
        .btn-close-toast:hover { opacity:1; }
        @keyframes slideDownToast {
          from { transform:translateX(20px); opacity:0; }
          to   { transform:translateX(0);     opacity:1; }
        }
      `}</style>
    </div>
  );
}
