import React from 'react';
import { MapPin, Phone, Mail, Train, Clock, Compass, ExternalLink, Bus, LocateIcon } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import Footer from './Footer';

export default function LocationTab({ setActiveTab }) {
  const { contact, hours, company } = APP_CONFIG;
  return (
    <div className="location-tab animate-fade-in-up">
      {/* Map Header */}
      <div className="map-view-container">
        <div className="map-canvas">
          <div className="map-controls">
            <button>+</button>
            <button>-</button>
          </div>
          <div className="map-pin-marker">
            <div className="pin-pulse"></div>
            <div className="pin-icon-circle">M</div>
          </div>
        </div>
      </div>

      {/* Restaurant Address & details */}
      <div className="location-details-section">
        <div className="location-top-grid">
          <div className="location-card">
            <span className="location-label"><MapPin size={16} /> OUR LOCATION</span>
            <h2>{company}</h2>
            <p className="address-text">{contact.address}</p>
            <div className="location-actions">
              <a href={contact.googleMapsUrl} target="_blank" rel="noreferrer" className="btn-get-directions">
                Get Directions <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="transit-card">
            <h3><Bus size={18} /> How to Reach Us</h3>
            <div className="transit-row">
              <div className="transit-badge-circle subway-n"><Bus size={16} /> </div>
              <div className="transit-info">
                <span>Bus Route</span>
                <p>Take any bus towards Balkot / Suryabinayak  <br /> 
Exit at Balkot Chowk (2 min walk)</p>
              </div>
            </div>
            <div className="transit-row">
              <div className="transit-badge-circle bus-m"><LocateIcon size={16} /></div>
              <div className="transit-info">
                <span>Landmark</span>
                <p>Opposite of XYZ GYM (1 min walk)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-contact-card">
          <h3><Compass size={18} /> Direct Contacts</h3>
          <div className="contact-items-grid">
            <div className="contact-item">
              <Phone size={16} />
              <div>
                <span>Call Us</span>
                <p>{contact.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <div>
                <span>Write Us</span>
                <p>{contact.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <Clock size={16} />
              <div>
                <span>Support Hours</span>
                <p>{hours.monday.open} – {hours.sunday.close} Daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      <style>{`
        .location-tab { display:flex; flex-direction:column; gap:20px; padding-bottom:24px; }

        .map-view-container { width:100%; height:260px; background-color:#E3F2FD; position:relative; overflow:hidden; border-bottom:1px solid var(--border-light); }
        .map-canvas { width:100%; height:100%; background-image:radial-gradient(#C8E6C9 1px,transparent 1px),radial-gradient(#B3E5FC 1.5px,transparent 1.5px); background-size:24px 24px,32px 32px; background-color:#E1F5FE; position:relative; }
        .map-canvas::before { content:''; position:absolute; width:100%; height:30px; background-color:#FFF; top:100px; transform:rotate(-5deg); box-shadow:0 2px 4px rgba(0,0,0,0.05); }
        .map-canvas::after { content:''; position:absolute; width:35px; height:100%; background-color:#FFF; left:50%; transform:rotate(15deg); box-shadow:2px 0 4px rgba(0,0,0,0.05); }

        .map-controls { position:absolute; right:16px; top:16px; display:flex; flex-direction:column; gap:4px; z-index:10; }
        .map-controls button { width:28px; height:28px; background-color:#FFF; border:1px solid var(--border-light); border-radius:4px; font-size:16px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm); }

        .map-pin-marker { position:absolute; top:90px; left:50%; transform:translate(-50%,-50%); z-index:5; }
        .pin-pulse { width:44px; height:44px; background-color:rgba(156,12,23,0.2); border:1.5px solid var(--primary); border-radius:50%; position:absolute; top:-12px; left:-12px; animation:mapPinPulse 1.8s infinite ease-out; }
        @keyframes mapPinPulse { 0%{transform:scale(0.4);opacity:1;} 100%{transform:scale(1.3);opacity:0;} }
        .pin-icon-circle { width:22px; height:22px; background-color:var(--primary); color:var(--secondary); font-family:var(--font-serif); font-weight:900; font-size:11px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; box-shadow:0 4px 10px rgba(0,0,0,0.25); position:relative; }
        .pin-icon-circle::after { content:''; position:absolute; bottom:-6px; left:50%; transform:translateX(-50%); border-left:5px solid transparent; border-right:5px solid transparent; border-top:6px solid var(--primary); }

        .location-details-section { padding:0 20px; display:flex; flex-direction:column; gap:16px; text-align:left; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .location-top-grid { display:flex; flex-direction:column; gap:16px; }

        .location-card { background-color:#FFF; border-radius:var(--border-radius-md); padding:18px; border:1px solid var(--border-light); box-shadow:var(--shadow-sm); }
        .location-label { font-size:10px; font-weight:800; color:var(--primary); letter-spacing:0.5px; display:flex; align-items:center; gap:4px; margin-bottom:6px; }
        .location-card h2 { font-family:var(--font-serif); font-size:20px; color:var(--text-primary); margin-bottom:6px; }
        .address-text { font-size:13px; color:var(--text-secondary); line-height:1.4; margin-bottom:16px; }
        .btn-get-directions { background-color:var(--primary); color:white; text-decoration:none; display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:700; padding:8px 16px; border-radius:8px; transition:all var(--transition-fast); }
        .btn-get-directions:hover { background-color:var(--primary-hover); }

        .transit-card, .quick-contact-card { background-color:#FFF; border-radius:var(--border-radius-md); padding:16px; border:1px solid var(--border-light); box-shadow:var(--shadow-sm); }
        .transit-card h3, .quick-contact-card h3 { font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:14px; display:flex; align-items:center; gap:8px; border-bottom:1px solid var(--border-light); padding-bottom:8px; }

        .transit-row { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
        .transit-row:last-child { margin-bottom:0; }
        .transit-badge-circle { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:800; }
        .subway-n { background-color:#F4B61C; color:black; }
        .subway-q { background-color:#F4B61C; color:black; }
        .subway-r { background-color:#F4B61C; color:black; }
        .bus-m { background-color:#E53935; }
        .transit-info span { font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; }
        .transit-info p { font-size:12px; color:var(--text-secondary); }

        .contact-items-grid { display:flex; flex-direction:column; gap:0; }
        .contact-item { display:flex; align-items:center; gap:14px; padding:12px 0; color:var(--text-secondary); border-bottom:1px solid var(--border-light); }
        .contact-item:last-child { border-bottom:none; padding-bottom:0; }
        .contact-item span { display:block; font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase; }
        .contact-item p { font-size:13px; font-weight:600; color:var(--text-primary); }

        /* ═══ DESKTOP ═══ */
        @media (min-width: 768px) {
          .map-view-container { height:350px; }
          .map-pin-marker { top:140px; }
          .location-details-section { padding:0 var(--content-padding); }
          .location-top-grid { flex-direction:row; gap:24px; }
          .location-top-grid > * { flex:1; }
          .location-card h2 { font-size:24px; }

          .contact-items-grid { flex-direction:row; gap:24px; }
          .contact-item { flex:1; flex-direction:column; text-align:center; border-bottom:none; border-right:1px solid var(--border-light); padding:0 16px; }
          .contact-item:last-child { border-right:none; }
        }

        @media (min-width: 1024px) {
          .map-view-container { height:400px; }
          .map-pin-marker { top:170px; }
        }
      `}</style>
    </div>
  );
}
