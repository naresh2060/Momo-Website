import React, { useState } from 'react';
import { Calendar, Users, Clock, Sparkles, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ReserveTab({ addToast }) {
  const [step, setStep] = useState('form'); // 'form' or 'confirmed'
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    phone: '',
    email: '',
    requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmCode, setConfirmCode] = useState('');

  const handleGuestsChange = (val) => {
    setFormData({ ...formData, guests: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.name || !formData.phone || !formData.email) {
      addToast('Please fill out all required fields.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      const code = `MOMO-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmCode(code);
      setStep('confirmed');
      addToast('Table reserved successfully!', 'success');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      date: '',
      time: '',
      guests: '2',
      name: '',
      phone: '',
      email: '',
      requests: ''
    });
    setStep('form');
  };

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', 
    '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  return (
    <div className="reserve-tab animate-fade-in-up">
      {step === 'form' ? (
        <div className="reserve-form-container">
          <div className="reserve-hero">
            <Calendar className="hero-icon-calendar" size={32} />
            <h2>Himalayan Table Booking</h2>
            <p>Book your table ahead of time to experience our freshly steamed momos with zero wait time.</p>
          </div>

          <form onSubmit={handleSubmit} className="reserve-form">
            {/* Guest Selector */}
            <div className="form-group-custom">
              <label><Users size={16} /> NUMBER OF GUESTS</label>
              <div className="guest-selector">
                {['1', '2', '3', '4', '5', '6+'].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`guest-btn ${formData.guests === num ? 'active' : ''}`}
                    onClick={() => handleGuestsChange(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div className="form-group-custom">
              <label htmlFor="reserveDate"><Calendar size={16} /> SELECT DATE</label>
              <input
                type="date"
                id="reserveDate"
                className="date-picker-input"
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            {/* Time Slot Picker */}
            <div className="form-group-custom">
              <label><Clock size={16} /> CHOOSE TIME SLOT</label>
              <div className="time-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot-btn ${formData.time === slot ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, time: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* User details */}
            <div className="details-section">
              <h3>Contact Details</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Special Request (e.g. Birthday celebration, wheelchair access, spicy chutney request)"
                  rows="2"
                  value={formData.requests}
                  onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn-reserve-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying table availability...' : 'Confirm Table Booking'}
            </button>
          </form>
        </div>
      ) : (
        /* Confirmed Booking View */
        <div className="confirmation-container">
          <div className="success-banner">
            <CheckCircle size={48} className="success-check-icon" />
            <h2>Reservation Confirmed!</h2>
            <p>Your table is locked. We are preparing the steam pots.</p>
          </div>

          <div className="ticket-card">
            <div className="ticket-header">
              <span className="ticket-title">MOMO HOUSE TICKET</span>
              <span className="ticket-code">{confirmCode}</span>
            </div>
            
            <div className="ticket-body">
              <div className="ticket-info-row">
                <div>
                  <span className="ticket-label">GUESTS</span>
                  <span className="ticket-val">{formData.guests} Guests</span>
                </div>
                <div>
                  <span className="ticket-label">TIME</span>
                  <span className="ticket-val">{formData.time}</span>
                </div>
              </div>

              <div className="ticket-info-row" style={{ marginTop: 12 }}>
                <div>
                  <span className="ticket-label">DATE</span>
                  <span className="ticket-val">{formData.date}</span>
                </div>
                <div>
                  <span className="ticket-label">RESERVED FOR</span>
                  <span className="ticket-val">{formData.name}</span>
                </div>
              </div>

              {formData.requests && (
                <div className="ticket-notes" style={{ marginTop: 12 }}>
                  <span className="ticket-label">NOTES</span>
                  <p className="ticket-notes-val">"{formData.requests}"</p>
                </div>
              )}
            </div>

            {/* Dummy QR Code */}
            <div className="ticket-footer">
              <div className="qr-wrapper">
                <div className="qr-block">
                  <div className="qr-box"></div>
                </div>
              </div>
              <span className="ticket-footer-text">Present this ticket at the counter</span>
            </div>
          </div>

          <button className="btn-back-reservation" onClick={handleReset}>
            <RefreshCw size={14} /> Book Another Table
          </button>
        </div>
      )}

      <style>{`
        .reserve-tab {
          padding: 20px 20px 24px;
        }

        .reserve-hero {
          text-align: center;
          margin-bottom: 24px;
        }

        .hero-icon-calendar {
          color: var(--primary);
          margin-bottom: 12px;
        }

        .reserve-hero h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          color: var(--text-primary);
        }

        .reserve-hero p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 6px;
          padding: 0 10px;
        }

        .reserve-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group-custom {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }

        .form-group-custom label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .guest-selector {
          display: flex;
          gap: 6px;
        }

        .guest-btn {
          flex: 1;
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          padding: 10px 0;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 13px;
          color: var(--text-secondary);
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .guest-btn.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
          box-shadow: 0 2px 8px rgba(156, 12, 23, 0.2);
        }

        .date-picker-input {
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 10px 12px;
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          color: var(--text-primary);
        }

        .date-picker-input:focus {
          border-color: var(--primary);
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }

        .time-slot-btn {
          background-color: #FFFFFF;
          border: 1px solid var(--border-light);
          padding: 8px 0;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 11px;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .time-slot-btn:hover {
          border-color: var(--secondary);
          color: var(--secondary-hover);
        }

        .time-slot-btn.active {
          background-color: var(--secondary);
          border-color: var(--secondary);
          color: var(--text-primary);
          font-weight: 700;
          box-shadow: 0 2px 6px rgba(244, 182, 28, 0.2);
        }

        .details-section {
          background-color: #FFFFFF;
          border-radius: var(--border-radius-md);
          padding: 16px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .details-section h3 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 6px;
          margin-bottom: 4px;
        }

        .form-group-row {
          display: flex;
          gap: 8px;
        }

        .form-group-row .form-group {
          flex: 1;
        }

        .details-section input,
        .details-section textarea {
          width: 100%;
          background-color: #F8F7F4;
          border: 1px solid var(--border-light);
          border-radius: var(--border-radius-sm);
          padding: 10px 12px;
          font-family: var(--font-sans);
          font-size: 13px;
          outline: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .details-section input:focus,
        .details-section textarea:focus {
          background-color: #FFFFFF;
          border-color: var(--primary);
        }

        .btn-reserve-submit {
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

        .btn-reserve-submit:hover {
          background-color: var(--primary-hover);
        }

        .btn-reserve-submit:disabled {
          opacity: 0.8;
          cursor: wait;
        }

        /* Confirmation styles */
        .confirmation-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .success-banner {
          text-align: center;
          margin-top: 10px;
        }

        .success-check-icon {
          color: #4CAF50;
          margin-bottom: 8px;
          filter: drop-shadow(0 4px 6px rgba(76,175,80,0.15));
        }

        .success-banner h2 {
          font-family: var(--font-serif);
          font-size: 24px;
          color: var(--text-primary);
        }

        .success-banner p {
          font-size: 13px;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .ticket-card {
          width: 100%;
          background-color: #FFFFFF;
          border-radius: var(--border-radius-md);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          position: relative;
        }

        /* Ticket jagged border separator trick */
        .ticket-card::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          border-bottom: 2px dashed var(--border-light);
          top: 134px;
        }

        .ticket-header {
          background-color: var(--primary);
          color: white;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ticket-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--secondary);
        }

        .ticket-code {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 700;
        }

        .ticket-body {
          padding: 20px 18px 30px;
          text-align: left;
        }

        .ticket-info-row {
          display: flex;
          justify-content: space-between;
        }

        .ticket-info-row > div {
          flex: 1;
        }

        .ticket-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .ticket-val {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .ticket-notes {
          background-color: #F8F7F4;
          border-radius: var(--border-radius-sm);
          padding: 8px 10px;
          border: 1px solid var(--border-light);
        }

        .ticket-notes-val {
          font-size: 12px;
          font-style: italic;
          color: var(--text-secondary);
        }

        .ticket-footer {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background-color: #FAFAFA;
        }

        .qr-wrapper {
          padding: 8px;
          background-color: white;
          border: 1px solid var(--border-light);
          border-radius: 8px;
        }

        .qr-block {
          width: 80px;
          height: 80px;
          background-image: 
            linear-gradient(45deg, #111 25%, transparent 25%), 
            linear-gradient(-45deg, #111 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #111 75%), 
            linear-gradient(-45deg, transparent 75%, #111 75%);
          background-size: 10px 10px;
          background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
          opacity: 0.85;
          position: relative;
        }

        .qr-box {
          position: absolute;
          top: 0;
          left: 0;
          width: 25px;
          height: 25px;
          background-color: #111;
          border: 3px solid #FFF;
          box-shadow: 0 0 0 2px #111;
        }

        .ticket-footer-text {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-back-reservation {
          background-color: #FFFFFF;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 10px 16px;
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all var(--transition-fast);
          box-shadow: var(--shadow-sm);
        }

        .btn-back-reservation:hover {
          color: var(--primary);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
}
