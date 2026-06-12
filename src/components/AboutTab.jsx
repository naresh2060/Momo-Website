import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Sprout } from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="about-tab animate-fade-in-up">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <span className="badge badge-yellow">EST. 2012</span>
          <h1>Crafting Joy,<br />One Fold at a Time</h1>
          <p>
            Experience the authentic flavors through traditional Himalayan recipes passed down through generations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <h2 className="section-title">Our Story</h2>
        <div className="story-content">
          <p>
            Our journey began in the vibrant heart of Kathmandu, where the aroma of steaming momos and grinding spices filled the narrow alleys of our family home. These dumplings weren't just meals; they were symbols of gathering, joy, and hospitality.
          </p>
          <p>
            When we moved across the ocean, we carried more than just luggage—we brought our grandmother's traditional bronze pots and a passion to share the warmth of Himalayan hospitality. Today, Momo House stands as a bridge between two worlds, offering authentic tastes made with the same love we felt in our childhood kitchen.
          </p>
        </div>

        <div className="story-image-card">
          <img 
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400" 
            alt="Kathmandu street heritage view" 
            loading="lazy"
          />
          <span className="image-caption">Connecting Kathmandu to New York</span>
        </div>
      </section>

      {/* Secret in Spices */}
      <section className="spices-section">
        <h2 className="section-title">The Secret is in the Spice</h2>
        <p className="spices-subtitle">
          We source our spices direct from small-holder farmers in Nepal to ensure the profile of our dishes remains authentic.
        </p>

        <div className="spice-card-pair">
          <div className="spice-card">
            <div className="spice-card-icon">
              <Sparkles size={24} />
            </div>
            <h3>Authentic Timur</h3>
            <p>
              The distinctive tingly sensation of our momos comes from high-altitude Timur peppers, hand-picked and ground daily.
            </p>
            <div className="spice-img-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400" 
                alt="Nepalese spices and red chillies" 
                loading="lazy"
              />
            </div>
          </div>

          <div className="spice-card peach">
            <div className="spice-card-icon">
              <Sprout size={24} />
            </div>
            <h3>Fresh & Local</h3>
            <p>
              While our spices travel far, our produce is sourced from local organic farms within a 50-mile radius to ensure vibrant fillings.
            </p>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="chef-section">
        <div className="chef-image-card">
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400" 
            alt="Chef Arjun in restaurant kitchen" 
            loading="lazy"
          />
        </div>
        <div className="chef-details">
          <span className="chef-title">EXECUTIVE CHEF</span>
          <h3>Meet Chef Arjun</h3>
          <p className="chef-quote">
            "A momo is not just food; it is an art of patience and precision."
          </p>
          <p className="chef-bio">
            Chef Arjun began his apprenticeship in a family-owned eatery in the streets of Bhaktapur. Over two decades, he has refined the balance of dough-to-filling ratio and the precise science of the steam-time, ensuring that the 10-pleat tradition is maintained in every single dumpling served.
          </p>
        </div>
      </section>

      {/* Pillars / Values Grid */}
      <section className="pillars-section">
        <div className="pillar-card">
          <Award size={32} className="pillar-icon" />
          <h3>Quality</h3>
          <p>Handfolded fresh daily, meticulous preparation in every single bite.</p>
        </div>

        <div className="pillar-card">
          <ShieldCheck size={32} className="pillar-icon" />
          <h3>Tradition</h3>
          <p>Keeping centuries-old Himalayan culinary wisdom and recipes alive.</p>
        </div>

        <div className="pillar-card">
          <Heart size={32} className="pillar-icon" />
          <h3>Community</h3>
          <p>Creating a warm, inclusive space for everyone to share joy and flavor.</p>
        </div>
      </section>

      <style>{`
        .about-tab {
          display: flex;
          flex-direction: column;
          gap: 36px;
          padding-bottom: 24px;
        }

        .about-hero {
          background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('/steaming_momos.png');
          background-size: cover;
          background-position: center;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
          padding: 20px;
        }

        .about-hero-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .about-hero h1 {
          font-family: var(--font-serif);
          font-size: 28px;
          line-height: 1.2;
          color: var(--secondary);
        }

        .about-hero p {
          font-size: 13px;
          max-width: 320px;
          line-height: 1.5;
          opacity: 0.9;
        }

        .story-section {
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .story-content {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .story-image-card {
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
          position: relative;
        }

        .story-image-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .image-caption {
          display: block;
          padding: 8px;
          background-color: #FFFFFF;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          text-align: center;
        }

        .spices-section {
          background-color: #F8F7F4;
          padding: 24px 20px;
          border-radius: var(--border-radius-lg);
          margin: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .spices-subtitle {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          text-align: center;
          margin-top: -8px;
        }

        .spice-card-pair {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .spice-card {
          background-color: #FFFFFF;
          border-radius: var(--border-radius-md);
          padding: 18px;
          text-align: left;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-light);
        }

        .spice-card.peach {
          background-color: var(--secondary-light);
          border-color: rgba(244, 182, 28, 0.2);
        }

        .spice-card-icon {
          width: 40px;
          height: 40px;
          background-color: var(--primary-light);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .spice-card.peach .spice-card-icon {
          background-color: rgba(244, 182, 28, 0.2);
          color: var(--secondary-hover);
        }

        .spice-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        .spice-card p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .spice-img-wrapper {
          width: 100%;
          height: 110px;
          border-radius: var(--border-radius-sm);
          overflow: hidden;
        }

        .spice-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chef-section {
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          text-align: left;
        }

        .chef-image-card {
          border-radius: var(--border-radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-light);
        }

        .chef-image-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .chef-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chef-title {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--primary);
        }

        .chef-details h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          color: var(--text-primary);
        }

        .chef-quote {
          font-family: var(--font-serif);
          font-size: 15px;
          font-style: italic;
          color: var(--primary-hover);
          border-left: 2px solid var(--primary);
          padding-left: 12px;
          margin: 4px 0;
        }

        .chef-bio {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .pillars-section {
          background-color: var(--primary);
          color: white;
          padding: 24px 20px;
          margin: 0 16px;
          border-radius: var(--border-radius-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }

        .pillar-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .pillar-icon {
          color: var(--secondary);
        }

        .pillar-card h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .pillar-card p {
          font-size: 12px;
          opacity: 0.8;
          max-width: 280px;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
