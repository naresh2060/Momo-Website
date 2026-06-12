import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Calendar, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import Footer from './Footer';

export default function HomeTab({ setActiveTab, addToast }) {
  const { company, tagline, contact, hours, social, currency } = APP_CONFIG;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      addToast('Message sent! We will connect with you soon.', 'success');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1200);
  };

  const galleryImages = [
    { src: '/steaming_momos.png', alt: 'Steaming Momos in Bamboo Basket' },
    { src: '/restaurant_interior.png', alt: 'Cozy Dining Room' },
    { src: '/jhol_momos.png', alt: 'Momo Dumplings in Jhol Broth' },
    { src: '/chef_folding_momo.png', alt: 'Chef Folding Dumplings' },
    { src: '/salad_bowl.png', alt: 'Fresh Himalayan Salad Side' },
    { src: '/chilli_momos.png', alt: 'Spicy Chilli Fried Momos' },
  ];

  return (
    <div className="home-tab animate-fade-in-up">
      {/* Hero Section */}
      <section className="hero-section">
        <span className="badge badge-yellow">Himalayan Classic</span>
        <h1 className="hero-title">{tagline}</h1>
        <p className="hero-subtitle">
          From the steam of the pot to the vibrant colors of our authentic spices, witness the artistry of {company}.
        </p>
      </section>

      {/* Image Gallery */}
      <section className="gallery-section">
        <div className="gallery-scroll">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="gallery-card">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="scroll-indicator">
          <span>Swipe to explore our kitchen</span>
          <ArrowRight size={14} className="arrow-bounce" />
        </div>
      </section>

      {/* Let's Connect */}
      <section className="connect-section">
        <h2 className="section-title">Let's Connect</h2>
        <p className="section-subtitle">
          We'd love to hear from you. Whether it's a reservation query, feedback, or just sharing some love.
        </p>

        <div className="connect-grid">
          {/* Left column: Contact info + Hours */}
          <div className="connect-left">
            <div className="contact-info-list">
              <a href={`tel:${contact.phone}`} className="info-card">
                <div className="info-icon-wrapper red"><Phone size={20} /></div>
                <div className="info-details">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{contact.phone}</span>
                </div>
              </a>
              <a href={`mailto:${contact.email}`} className="info-card">
                <div className="info-icon-wrapper pink"><Mail size={20} /></div>
                <div className="info-details">
                  <span className="info-label">Email</span>
                  <span className="info-value">{contact.email}</span>
                </div>
              </a>
              <div className="info-card">
                <div className="info-icon-wrapper orange"><MapPin size={20} /></div>
                <div className="info-details">
                  <span className="info-label">Address</span>
                  <span className="info-value">{contact.address}</span>
                </div>
              </div>
            </div>

            <div className="hours-card">
              <div className="hours-header">
                <h3>Opening Hours</h3>
                <span className="status-badge"><span className="status-dot"></span>OPEN NOW</span>
              </div>
              <div className="hours-row"><span>Monday</span><span>{hours.monday.open} – {hours.monday.close}</span></div>
              <div className="hours-row"><span>Tuesday</span><span>{hours.tuesday.open} – {hours.tuesday.close}</span></div>
              <div className="hours-row"><span>Wednesday</span><span>{hours.wednesday.open} – {hours.wednesday.close}</span></div>
              <div className="hours-row"><span>Thrusday</span><span>{hours.thursday.open} – {hours.thursday.close}</span></div>
              <div className="hours-row"><span>Friday</span><span>{hours.friday.open} – {hours.friday.close}</span></div>
              <div className="hours-row"><span>Saturday</span><span>{hours.saturday.open} – {hours.saturday.close}</span></div>
              <div className="hours-row"><span>Sunday</span><span>{hours.sunday.open} – {hours.sunday.close}</span></div>
            </div>
          </div>

          {/* Right column: Form + Map */}
          <div className="connect-right">
            <div className="message-form-container">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit} className="message-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input type="text" id="fullName" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="emailAddress">Email Address</label>
                  <input type="email" id="emailAddress" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="yourMessage">Your Message</label>
                  <textarea id="yourMessage" rows="4" placeholder="How can we help you today?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn-send-message" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                </button>
              </form>
            </div>

            <div className="map-placeholder-card">
              <div className="map-pattern">
                <div className="map-radar"></div>
                <MapPin size={32} className="map-pin-pulse" />
              </div>
              <span className="map-label">Pin dropped on Kathmandu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      <style>{`
        .home-tab { display:flex; flex-direction:column; gap:32px; padding-bottom:24px; }

        /* ── Hero ── */
        .hero-section { padding:24px 20px 0; text-align:center; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .hero-title { font-family:var(--font-serif); font-size:32px; color:var(--primary); line-height:1.15; margin:16px 0 12px; }
        .hero-subtitle { font-size:14px; color:var(--text-secondary); line-height:1.5; padding:0 10px; max-width:600px; margin:0 auto; }

        /* ── Gallery ── */
        .gallery-section { position:relative; padding:0 20px; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .gallery-scroll { display:flex; gap:16px; overflow-x:auto; scroll-snap-type:x mandatory; padding-bottom:12px; scrollbar-width:none; }
        .gallery-scroll::-webkit-scrollbar { display:none; }
        .gallery-card { flex:0 0 85%; aspect-ratio:4/5; border-radius:var(--border-radius-md); overflow:hidden; scroll-snap-align:center; box-shadow:var(--shadow-md); border:1px solid var(--border-light); }
        .gallery-card img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease; }
        .gallery-card:hover img { transform:scale(1.05); }
        .scroll-indicator { display:flex; align-items:center; justify-content:center; gap:6px; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px; margin-top:8px; }
        .arrow-bounce { animation:arrowBounce 1s infinite alternate; }
        @keyframes arrowBounce { from{transform:translateX(0);} to{transform:translateX(4px);} }

        /* ── Connect ── */
        .connect-section { padding:24px 20px; background-color:#F8F7F4; border-radius:var(--border-radius-lg); margin:0 16px; display:flex; flex-direction:column; gap:20px; }
        .section-title { font-family:var(--font-serif); font-size:26px; color:var(--primary); text-align:center; }
        .section-subtitle { font-size:13px; color:var(--text-secondary); text-align:center; line-height:1.5; margin-top:-12px; padding:0 8px; }
        .connect-grid { display:flex; flex-direction:column; gap:20px; }
        .connect-left, .connect-right { display:flex; flex-direction:column; gap:16px; }
        .contact-info-list { display:flex; flex-direction:column; gap:12px; }
        .info-card { background-color:#FFF; border-radius:var(--border-radius-md); padding:14px 16px; display:flex; align-items:center; gap:16px; text-decoration:none; color:inherit; box-shadow:var(--shadow-sm); transition:transform var(--transition-fast); }
        .info-card:hover { transform:translateY(-2px); }
        .info-icon-wrapper { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; }
        .info-icon-wrapper.red { background-color:#FFF2F3; color:#E53935; }
        .info-icon-wrapper.pink { background-color:#FFF0F2; color:#EC407A; }
        .info-icon-wrapper.orange { background-color:#FFF8F2; color:#FB8C00; }
        .info-details { display:flex; flex-direction:column; gap:2px; }
        .info-label { font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; }
        .info-value { font-size:14px; font-weight:600; color:var(--text-primary); }

        .hours-card { background-color:var(--primary); color:var(--text-white); border-radius:var(--border-radius-md); padding:20px; box-shadow:var(--shadow-md); display:flex; flex-direction:column; gap:12px; }
        .hours-header { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.15); padding-bottom:8px; }
        .hours-header h3 { font-size:16px; font-weight:700; letter-spacing:0.5px; }
        .status-badge { background-color:rgba(255,255,255,0.2); font-size:10px; font-weight:700; padding:4px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:6px; }
        .status-dot { width:6px; height:6px; background-color:#81C784; border-radius:50%; box-shadow:0 0 6px #81C784; }
        .hours-row { display:flex; justify-content:space-between; font-size:13px; font-weight:500; }

        .message-form-container { background-color:#FFF; border-radius:var(--border-radius-md); padding:20px; box-shadow:var(--shadow-sm); }
        .message-form-container h3 { font-size:16px; font-weight:700; margin-bottom:16px; color:var(--text-primary); }
        .message-form { display:flex; flex-direction:column; gap:14px; }
        .form-group { display:flex; flex-direction:column; gap:6px; text-align:left; }
        .form-group label { font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; }
        .form-group input, .form-group textarea { background-color:#F8F7F4; border:1px solid var(--border-light); border-radius:8px; padding:10px 12px; font-family:var(--font-sans); font-size:13px; outline:none; transition:all var(--transition-fast); }
        .form-group input:focus, .form-group textarea:focus { background-color:#FFF; border-color:var(--primary); box-shadow:0 0 0 3px rgba(156,12,23,0.1); }
        .btn-send-message { background-color:var(--primary); color:white; border:none; border-radius:8px; padding:12px; font-family:var(--font-sans); font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all var(--transition-fast); }
        .btn-send-message:hover { background-color:var(--primary-hover); }
        .btn-send-message:disabled { opacity:0.7; cursor:not-allowed; }

        .map-placeholder-card { border-radius:var(--border-radius-md); overflow:hidden; background:linear-gradient(135deg,#E0E0E0,#F0F0F0); border:1px solid var(--border-light); box-shadow:var(--shadow-sm); }
        .map-pattern { height:140px; position:relative; display:flex; align-items:center; justify-content:center; background-image:radial-gradient(#BDBDBD 1px,transparent 1px); background-size:16px 16px; }
        .map-radar { width:80px; height:80px; background-color:rgba(156,12,23,0.08); border:2px dashed rgba(156,12,23,0.2); border-radius:50%; position:absolute; animation:mapRadarPulse 2s infinite linear; }
        @keyframes mapRadarPulse { 0%{transform:scale(0.6);opacity:1;} 100%{transform:scale(1.3);opacity:0;} }
        .map-pin-pulse { color:var(--primary); z-index:2; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15)); animation:mapPinBounce 1s infinite alternate; }
        @keyframes mapPinBounce { from{transform:translateY(0);} to{transform:translateY(-6px);} }
        .map-label { display:block; padding:10px; background-color:#FFF; font-size:12px; font-weight:600; color:var(--text-secondary); }

        /* ── Footer CSS is modularized inside Footer.jsx ── */

        /* ══════════ DESKTOP ══════════ */
        @media (min-width: 768px) {
          .hero-section { padding:48px var(--content-padding) 0; }
          .hero-title { font-size:48px; }
          .hero-subtitle { font-size:17px; padding:0; }

          .gallery-section { padding:0 var(--content-padding); }
          .gallery-scroll { display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; overflow:visible; }
          .gallery-card { flex:none; aspect-ratio:4/3; }
          .scroll-indicator { display:none; }

          .connect-section { margin:0 var(--content-padding); padding:40px; border-radius:var(--border-radius-xl); }
          .section-title { font-size:34px; }
          .section-subtitle { font-size:15px; }
          .connect-grid { flex-direction:row; gap:32px; }
          .connect-left, .connect-right { flex:1; }

          .home-footer { padding:48px var(--content-padding) 32px; }
          .footer-main { flex-direction:row; gap:48px; }
          .footer-brand { flex:1; min-width:220px; }
          .footer-grid { grid-template-columns:1fr 1fr 1.5fr; flex:2; margin-bottom:0; }
          .footer-newsletter-col { grid-column: auto; }
          .footer-logo { font-size:28px; }
          .footer-desc { font-size:13px; margin-bottom:0; }
        }

        @media (min-width: 1024px) {
          .hero-title { font-size:56px; }
          .hero-subtitle { font-size:18px; max-width:700px; }
          .map-pattern { height:200px; }
        }
      `}</style>
    </div>
  );
}
