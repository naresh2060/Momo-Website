import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, Tag, Percent, Compass, CheckCircle, Clock } from 'lucide-react';

export default function CartTab({ cart, onUpdateQty, onRemove, onClearCart, addToast }) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'loading', 'tracker'
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery', 'pickup'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [trackerProgress, setTrackerProgress] = useState(0); // 0 (received), 1 (steaming), 2 (on the way), 3 (delivered)
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Compute Bill totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal > 35 ? 0 : 3.99) : 0;
  const tax = (subtotal - discountAmount) * 0.08875;
  const total = subtotal - discountAmount + deliveryFee + tax;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'MOMOLOVER') {
      setDiscountPercent(15);
      setAppliedPromo('MOMOLOVER (15% Off)');
      setPromoCode('');
      addToast('15% discount applied!', 'success');
    } else {
      addToast('Invalid promo code. Try "MOMOLOVER"', 'error');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setCheckoutStep('loading');
    setTimeout(() => {
      setCheckoutStep('tracker');
      onClearCart(); // empty cart state
      addToast('Order placed successfully!', 'success');
    }, 2000);
  };

  // Mock tracking increments
  useEffect(() => {
    let interval;
    if (checkoutStep === 'tracker') {
      setTrackerProgress(0);
      interval = setInterval(() => {
        setTrackerProgress((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            return 3;
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep]);

  if (checkoutStep === 'loading') {
    return (
      <div className="cart-loading-container animate-fade-in-up">
        <div className="steam-loader">
          <div className="steam-line line-1"></div>
          <div className="steam-line line-2"></div>
          <div className="steam-line line-3"></div>
          <div className="pot-body"></div>
        </div>
        <h3>Securing your Feast...</h3>
        <p>Connecting to payment gateway. Please do not close this window.</p>
        
        <style>{`
          .cart-loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 600px;
            padding: 20px;
            text-align: center;
          }

          .steam-loader {
            width: 100px;
            height: 100px;
            position: relative;
            margin-bottom: 24px;
          }

          .pot-body {
            width: 70px;
            height: 35px;
            background-color: var(--primary);
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
            position: absolute;
            bottom: 15px;
            left: 15px;
            border: 3px solid #111;
          }

          .pot-body::after {
            content: '';
            position: absolute;
            top: -6px;
            left: -8px;
            width: 80px;
            height: 6px;
            background-color: var(--secondary);
            border: 3px solid #111;
            border-radius: 4px;
          }

          .steam-line {
            width: 4px;
            height: 20px;
            background-color: var(--secondary);
            position: absolute;
            bottom: 60px;
            border-radius: 2px;
            animation: steamRise 1.5s infinite ease-out;
            opacity: 0;
          }

          .line-1 { left: 30px; animation-delay: 0.1s; }
          .line-2 { left: 48px; animation-delay: 0.4s; }
          .line-3 { left: 66px; animation-delay: 0.7s; }

          @keyframes steamRise {
            0% { transform: translateY(0) scaleY(0.5); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-30px) scaleY(1.2); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (checkoutStep === 'tracker') {
    const steps = [
      { id: 0, title: 'Order Received', desc: 'Confirming with our kitchen' },
      { id: 1, title: 'Steaming Momos', desc: 'Pleating & steaming your food' },
      { id: 2, title: 'Rider Out', desc: 'Out for hot delivery' },
      { id: 3, title: 'Feast Arrived', desc: 'Enjoy your hot Himalayan momos!' }
    ];

    return (
      <div className="tracker-container animate-fade-in-up">
        <div className="tracker-header">
          <CheckCircle size={40} className="tracker-check-icon" />
          <h2>Order Tracked</h2>
          <span className="order-id-label">ORDER ID: MH-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>

        {/* Status Line */}
        <div className="tracker-flow">
          {steps.map((s) => {
            const isCompleted = trackerProgress >= s.id;
            const isCurrent = trackerProgress === s.id;
            
            return (
              <div key={s.id} className={`tracker-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                <div className="tracker-indicator">
                  <div className="tracker-dot"></div>
                  {s.id < 3 && <div className="tracker-line"></div>}
                </div>
                <div className="tracker-details">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery map mockup */}
        <div className="delivery-map">
          <div className="map-road-track"></div>
          <div className="map-restaurant-point">H</div>
          <div className={`map-rider-marker progress-${trackerProgress}`}>🏍️</div>
          <div className="map-home-point">🏠</div>
        </div>

        <div className="delivery-eta-card">
          <Clock size={18} />
          <div>
            <span>ESTIMATED DELIVERY TIME</span>
            <p>{trackerProgress === 3 ? 'Delivered!' : '20 - 30 minutes'}</p>
          </div>
        </div>

        <button className="btn-return-menu" onClick={() => setCheckoutStep('cart')}>
          Back to Cart
        </button>

        <style>{`
          .tracker-container {
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }

          .tracker-check-icon {
            color: #4CAF50;
            margin-bottom: 6px;
          }

          .order-id-label {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.5px;
            margin-top: 4px;
          }

          .tracker-flow {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: left;
            padding: 10px 12px;
          }

          .tracker-step {
            display: flex;
            gap: 16px;
            opacity: 0.4;
            transition: all var(--transition-normal);
          }

          .tracker-step.completed {
            opacity: 1;
          }

          .tracker-step.current {
            opacity: 1;
            color: var(--primary);
          }

          .tracker-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
          }

          .tracker-dot {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: var(--text-muted);
            border: 2px solid white;
            box-shadow: 0 0 0 2px var(--border-light);
            z-index: 2;
          }

          .tracker-step.completed .tracker-dot {
            background-color: #4CAF50;
            box-shadow: 0 0 0 2px rgba(76,175,80,0.2);
          }

          .tracker-step.current .tracker-dot {
            background-color: var(--primary);
            box-shadow: 0 0 0 4px var(--primary-light);
          }

          .tracker-line {
            width: 2px;
            height: 48px;
            background-color: var(--border-light);
            position: absolute;
            top: 14px;
            z-index: 1;
          }

          .tracker-step.completed .tracker-line {
            background-color: #4CAF50;
          }

          .tracker-details h4 {
            font-size: 14px;
            font-weight: 700;
          }

          .tracker-details p {
            font-size: 11px;
            color: var(--text-secondary);
          }

          .delivery-map {
            width: 100%;
            height: 120px;
            background-color: #E8F5E9;
            border-radius: var(--border-radius-md);
            position: relative;
            overflow: hidden;
            border: 1px solid var(--border-light);
          }

          .map-road-track {
            position: absolute;
            height: 6px;
            background-color: #FFF;
            left: 20px;
            right: 20px;
            top: 60px;
            border-radius: 3px;
          }

          .map-restaurant-point,
          .map-home-point {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            position: absolute;
            top: 51px;
            border: 1.5px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .map-restaurant-point {
            background-color: var(--primary);
            color: var(--secondary);
            left: 15px;
          }

          .map-home-point {
            background-color: #4CAF50;
            right: 15px;
          }

          .map-rider-marker {
            font-size: 20px;
            position: absolute;
            top: 40px;
            transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .map-rider-marker.progress-0 { left: 24px; }
          .map-rider-marker.progress-1 { left: 80px; }
          .map-rider-marker.progress-2 { left: 180px; }
          .map-rider-marker.progress-3 { left: 300px; transform: scale(0); opacity: 0; }

          .delivery-eta-card {
            background-color: #FFFFFF;
            border-radius: var(--border-radius-md);
            padding: 14px 18px;
            border: 1px solid var(--border-light);
            box-shadow: var(--shadow-sm);
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            text-align: left;
          }

          .delivery-eta-card span {
            font-size: 9px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.5px;
          }

          .delivery-eta-card p {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
          }

          .btn-return-menu {
            background-color: #FFFFFF;
            color: var(--text-secondary);
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 10px 18px;
            font-family: var(--font-sans);
            font-weight: 600;
            font-size: 13px;
            cursor: pointer;
            width: 100%;
            transition: all var(--transition-fast);
          }

          .btn-return-menu:hover {
            color: var(--primary);
            border-color: var(--primary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-tab animate-fade-in-up">
      <div className="cart-header">
        <ShoppingBag size={24} className="cart-header-icon" />
        <h2>Your Order List</h2>
        <p>Review details before payment</p>
      </div>

      {cart.length > 0 ? (
        <>
          {/* Cart list items */}
          <div className="cart-items-list">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="cart-item-row">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <div className="cart-item-head">
                    <h4>{item.name}</h4>
                    <span className="cart-item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Addons summary */}
                  {item.customizations && (
                    <div className="cart-item-meta">
                      <span>Spice: {item.customizations.spice}</span>
                      {item.customizations.extras && item.customizations.extras.length > 0 && (
                        <span> • Extra: {item.customizations.extras.join(', ')}</span>
                      )}
                    </div>
                  )}

                  <div className="cart-item-controls">
                    <div className="qty-counter-small">
                      <button 
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      className="btn-trash-item"
                      onClick={() => onRemove(item.id)}
                      aria-label="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery or Pickup Selector */}
          <div className="delivery-type-selector">
            <button
              className={`selector-btn ${deliveryType === 'delivery' ? 'active' : ''}`}
              onClick={() => setDeliveryType('delivery')}
            >
              Delivery
            </button>
            <button
              className={`selector-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
              onClick={() => setDeliveryType('pickup')}
            >
              Pickup
            </button>
          </div>

          {/* Promo code field */}
          <form onSubmit={handleApplyPromo} className="promo-form">
            <div className="promo-input-wrapper">
              <Tag size={16} className="promo-tag-icon" />
              <input
                type="text"
                placeholder="PROMO CODE (Try: MOMOLOVER)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="submit" className="btn-apply-promo">
                Apply
              </button>
            </div>
          </form>

          {appliedPromo && (
            <div className="applied-promo-tag">
              <Percent size={14} />
              <span>Promo applied: {appliedPromo}</span>
              <button className="btn-remove-promo" onClick={() => { setDiscountPercent(0); setAppliedPromo(''); }}>
                ✕
              </button>
            </div>
          )}

          {/* Bill summary details */}
          <div className="bill-summary-card">
            <h3>Bill Details</h3>
            <div className="bill-row">
              <span>Items Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {discountAmount > 0 && (
              <div className="bill-row discount">
                <span>Voucher Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="bill-row">
              <span>{deliveryType === 'delivery' ? 'Delivery Charge' : 'Pickup Fee'}</span>
              <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="bill-row">
              <span>Taxes (8.875%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="bill-row total">
              <span>To Pay</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button className="btn-place-order" onClick={handleCheckout}>
            Proceed to Payment (${total.toFixed(2)})
          </button>
        </>
      ) : (
        /* Empty Cart State */
        <div className="empty-cart-container">
          <ShoppingBag size={56} className="empty-cart-icon" />
          <h3>Your Basket is Empty</h3>
          <p>Explore our Himalayan Feast menu and add some steaming dumplings to your basket!</p>
        </div>
      )}

      <style>{`
        .cart-tab {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-header {
          text-align: center;
          margin-bottom: 8px;
        }

        .cart-header-icon {
          color: var(--primary);
          margin-bottom: 6px;
        }

        .cart-header h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          color: var(--text-primary);
        }

        .cart-header p {
          font-size: 12px;
          color: var(--text-muted);
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cart-item-row {
          background-color: #FFFFFF;
          border-radius: var(--border-radius-md);
          padding: 10px;
          display: flex;
          gap: 12px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
        }

        .cart-item-image {
          width: 70px;
          height: 70px;
          border-radius: var(--border-radius-sm);
          overflow: hidden;
          background-color: #EEE;
          flex-shrink: 0;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
        }

        .cart-item-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .cart-item-head h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .cart-item-total-price {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--primary);
        }

        .cart-item-meta {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .cart-item-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 6px;
        }

        .qty-counter-small {
          display: flex;
          align-items: center;
          background-color: #F8F7F4;
          border-radius: 6px;
          border: 1px solid var(--border-light);
          padding: 2px 4px;
        }

        .qty-counter-small button {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color var(--transition-fast);
        }

        .qty-counter-small button:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .qty-counter-small span {
          font-size: 12px;
          font-weight: 700;
          width: 24px;
          text-align: center;
        }

        .btn-trash-item {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }

        .btn-trash-item:hover {
          color: #D32F2F;
          background-color: #FFEBEE;
        }

        .delivery-type-selector {
          display: flex;
          background-color: #F8F7F4;
          border-radius: 8px;
          padding: 4px;
          border: 1px solid var(--border-light);
        }

        .selector-btn {
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

        .selector-btn.active {
          background-color: #FFFFFF;
          color: var(--text-primary);
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .promo-form {
          width: 100%;
        }

        .promo-input-wrapper {
          display: flex;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 2px 2px 2px 10px;
          align-items: center;
          gap: 8px;
          box-shadow: var(--shadow-sm);
        }

        .promo-tag-icon {
          color: var(--text-muted);
        }

        .promo-input-wrapper input {
          flex: 1;
          border: none;
          background: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .btn-apply-promo {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 14px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
        }

        .applied-promo-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          background-color: #E8F5E9;
          color: #2E7D32;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }

        .btn-remove-promo {
          background: none;
          border: none;
          color: #2E7D32;
          margin-left: auto;
          cursor: pointer;
          font-size: 12px;
        }

        .bill-summary-card {
          background-color: #FFFFFF;
          border-radius: var(--border-radius-md);
          padding: 14px 16px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bill-summary-card h3 {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 6px;
          margin-bottom: 2px;
        }

        .bill-row {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .bill-row.discount {
          color: #2E7D32;
          font-weight: 600;
        }

        .bill-row.total {
          border-top: 1px solid var(--border-light);
          padding-top: 8px;
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .btn-place-order {
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 14px;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 12px rgba(156, 12, 23, 0.2);
        }

        .btn-place-order:hover {
          background-color: var(--primary-hover);
        }

        .empty-cart-container {
          padding: 60px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .empty-cart-icon {
          color: var(--text-muted);
        }

        .empty-cart-container h3 {
          font-family: var(--font-serif);
          font-size: 20px;
          color: var(--text-primary);
        }

        .empty-cart-container p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
