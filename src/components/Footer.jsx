import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export default function Footer({ setActiveTab }) {
  const { company, social } = APP_CONFIG;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-journey">
          <span className="footer-meta">FOLLOW OUR JOURNEY</span>
          <div className="social-links">
            <a href={social.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href={social.facebook} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={social.tiktok} target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok"><Calendar size={18} /></a>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-logo">{company.toUpperCase()}</h2>
            <p className="footer-desc">Bringing the authentic taste of the Himalayas to your neighborhood. Every fold, a story.</p>
          </div>

          <div className="footer-grid">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li onClick={() => setActiveTab('menu')}>Menu</li>
                <li>About</li>
                <li>Gallery</li>
                <li onClick={() => setActiveTab('location')}>Contact</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Careers</h4>
              <ul>
                <li>Join Us</li>
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div className="footer-column footer-newsletter-col">
              <h4>Newsletter</h4>
              <div className="newsletter-input-wrapper">
                <input type="email" placeholder="Email" />
                <button className="newsletter-btn" aria-label="Subscribe"><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} {company}. Authentic Himalayan Delights.</p>
      </div>

      <style>{`
        .site-footer { background-color:var(--primary); color:white; padding:32px 20px 24px; margin-top:16px; text-align:left; }
        .footer-inner { max-width:var(--content-max-width); margin:0 auto; }
        .footer-journey { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:16px; margin-bottom:24px; }
        .footer-meta { font-size:10px; font-weight:800; letter-spacing:1px; opacity:0.8; }
        .social-links { display:flex; gap:8px; }
        .social-icon-btn { width:36px; height:36px; border-radius:50%; background-color:rgba(255,255,255,0.1); color:white; display:flex; align-items:center; justify-content:center; transition:background-color var(--transition-fast); }
        .social-icon-btn:hover { background-color:rgba(255,255,255,0.25); }
        .footer-logo { font-family:var(--font-serif); font-size:24px; color:var(--secondary); margin-bottom:8px; }
        .footer-desc { font-size:12px; line-height:1.5; opacity:0.8; margin-bottom:24px; }
        .footer-main { display:flex; flex-direction:column; gap:0; }
        .footer-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
        .footer-column h4 { font-size:12px; font-weight:700; margin-bottom:10px; text-transform:uppercase; letter-spacing:0.5px; color:var(--secondary); }
        .footer-column ul { list-style:none; display:flex; flex-direction:column; gap:6px; }
        .footer-column li { font-size:12px; opacity:0.8; cursor:pointer; transition:opacity var(--transition-fast); }
        .footer-column li:hover { opacity:1; color:var(--secondary); }
        .footer-newsletter-col { grid-column: 1 / -1; }
        .newsletter-input-wrapper { display:flex; background-color:rgba(255,255,255,0.1); border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.15); }
        .newsletter-input-wrapper input { flex:1; background:none; border:none; padding:10px 12px; color:white; font-family:var(--font-sans); font-size:13px; outline:none; }
        .newsletter-input-wrapper input::placeholder { color:rgba(255,255,255,0.5); }
        .newsletter-btn { background-color:var(--secondary); color:var(--text-primary); border:none; padding:0 14px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
        .newsletter-btn:hover { background-color:var(--secondary-hover); }
        .footer-copy { font-size:10px; opacity:0.6; text-align:center; border-top:1px solid rgba(255,255,255,0.08); padding-top:16px; }

        @media (min-width: 768px) {
          .site-footer { padding:48px var(--content-padding) 32px; }
          .footer-main { flex-direction:row; gap:48px; }
          .footer-brand { flex:1; min-width:220px; }
          .footer-grid { grid-template-columns:1fr 1fr 1.5fr; flex:2; margin-bottom:0; }
          .footer-newsletter-col { grid-column: auto; }
          .footer-logo { font-size:28px; }
          .footer-desc { font-size:13px; margin-bottom:0; }
        }
      `}</style>
    </footer>
  );
}
