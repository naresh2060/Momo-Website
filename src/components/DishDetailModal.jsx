import React, { useState } from 'react';
import { X, Star, Flame, Plus, Minus } from 'lucide-react';

export default function DishDetailModal({ dish, onClose }) {
  const [spice, setSpice] = useState('Medium');
  const [extras, setExtras] = useState([]);

  if (!dish) return null;

  const extraOptions = [
    { id: 'chutney', label: 'Extra Tomato Chutney', price: 0.75 },
    { id: 'peanut', label: 'Extra Spicy Peanut Sauce', price: 1.00 },
    { id: 'salad', label: 'Side Chickpea Salad', price: 2.50 }
  ];

  const handleExtraToggle = (id) => {
    if (extras.includes(id)) {
      setExtras(extras.filter(x => x !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  return (
    <div className="dish-modal-overlay" onClick={onClose}>
      <div className="dish-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="dish-modal-body">
          <div className="modal-hero-image">
            <img src={dish.image} alt={dish.name} />
          </div>

          <div className="modal-info-padding">
            <div className="modal-title-row">
              <h2>{dish.name}</h2>
              <span className="modal-price">${dish.price.toFixed(2)}</span>
            </div>

            <div className="modal-rating-row">
              <Star size={14} className="star-icon" />
              <span className="rating-val">{dish.rating}</span>
              <span className="reviews-val">({dish.reviews} reviews)</span>
            </div>

            <p className="modal-description">{dish.description}</p>

            <div className="custom-section">
              <span className="custom-section-title">
                <Flame size={14} /> CHOOSE SPICE LEVEL
              </span>
              <div className="spice-level-selector">
                {['Mild', 'Medium', 'Hot', 'Himalayan Fire'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`spice-btn ${spice === level ? 'active' : ''}`}
                    onClick={() => setSpice(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="custom-section">
              <span className="custom-section-title">ADD EXTRAS</span>
              <div className="extras-list">
                {extraOptions.map((opt) => {
                  const isChecked = extras.includes(opt.id);
                  return (
                    <label key={opt.id} className={`extra-item-label ${isChecked ? 'selected' : ''}`}>
                      <input type="checkbox" checked={isChecked} onChange={() => handleExtraToggle(opt.id)} />
                      <span className="extra-name">{opt.label}</span>
                      <span className="extra-price">+${opt.price.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-bottom-bar">
          <button className="btn-close-details" onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>

      <style>{`
        .dish-modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .dish-modal-container {
          background-color: var(--light-bg);
          width: 100%;
          max-height: 85%;
          border-top-left-radius: var(--border-radius-xl);
          border-top-right-radius: var(--border-radius-xl);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.15);
          animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes slideUp { from{transform:translateY(100%);} to{transform:translateY(0);} }

        .btn-close-modal { position:absolute; right:16px; top:16px; width:36px; height:36px; border-radius:50%; background-color:rgba(255,255,255,0.9); border:1px solid var(--border-light); color:var(--text-primary); cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:10; box-shadow:var(--shadow-sm); transition:all var(--transition-fast); }
        .btn-close-modal:hover { background-color:#FFF; transform:scale(1.05); }

        .dish-modal-body { overflow-y:auto; flex:1; }
        .modal-hero-image { width:100%; height:200px; background-color:#EEE; }
        .modal-hero-image img { width:100%; height:100%; object-fit:cover; }
        .modal-info-padding { padding:20px; text-align:left; }

        .modal-title-row { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; }
        .modal-title-row h2 { font-family:var(--font-serif); font-size:22px; color:var(--text-primary); }
        .modal-price { font-size:22px; font-weight:800; color:var(--primary); }

        .modal-rating-row { display:flex; align-items:center; gap:6px; margin-top:6px; }
        .star-icon { color:var(--secondary); fill:var(--secondary); }
        .rating-val { font-size:13px; font-weight:700; }
        .reviews-val { font-size:12px; color:var(--text-muted); }
        .modal-description { font-size:13px; color:var(--text-secondary); line-height:1.5; margin:14px 0; }

        .custom-section { border-top:1px solid var(--border-light); padding-top:16px; margin-top:16px; display:flex; flex-direction:column; gap:10px; }
        .custom-section-title { font-size:11px; font-weight:800; color:var(--text-muted); letter-spacing:0.5px; display:flex; align-items:center; gap:6px; }
        .spice-level-selector { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
        .spice-btn { background-color:#FFF; border:1px solid var(--border-light); border-radius:8px; padding:8px 0; font-family:var(--font-sans); font-weight:600; font-size:11px; cursor:pointer; color:var(--text-secondary); transition:all var(--transition-fast); }
        .spice-btn.active { background-color:var(--primary); color:white; border-color:var(--primary); box-shadow:0 2px 6px rgba(156,12,23,0.2); }

        .extras-list { display:flex; flex-direction:column; gap:8px; }
        .extra-item-label { background-color:#FFF; border:1px solid var(--border-light); border-radius:8px; padding:10px 14px; display:flex; align-items:center; gap:12px; cursor:pointer; font-size:13px; color:var(--text-secondary); transition:all var(--transition-fast); }
        .extra-item-label.selected { border-color:var(--secondary); background-color:var(--secondary-light); color:var(--text-primary); font-weight:600; }
        .extra-name { flex:1; }
        .extra-price { font-weight:700; color:var(--primary); }

        .modal-bottom-bar { padding:16px 20px 24px; background-color:#FFF; border-top:1px solid var(--border-light); display:flex; gap:12px; align-items:center; }
        .btn-close-details { flex:1; background-color:var(--primary); color:white; border:none; border-radius:8px; padding:12px 0; font-family:var(--font-sans); font-weight:700; font-size:14px; cursor:pointer; transition:all var(--transition-fast); }
        .btn-close-details:hover { background-color:var(--primary-hover); }

        /* ═══ DESKTOP ═══ */
        @media (min-width: 768px) {
          .dish-modal-overlay { align-items:center; padding:40px; }
          .dish-modal-container {
            max-width: 560px;
            max-height: 80vh;
            border-radius: var(--border-radius-xl);
            animation: scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
          }
          @keyframes scaleIn { from{transform:scale(0.92);opacity:0;} to{transform:scale(1);opacity:1;} }
          .modal-hero-image { height:280px; }
          .modal-title-row h2 { font-size:26px; }
          .modal-price { font-size:26px; }
          .modal-description { font-size:14px; }
        }
      `}</style>
    </div>
  );
}
