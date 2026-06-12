import React, { useState } from 'react';
import { Search, Star, Flame, Leaf, Award } from 'lucide-react';
import Footer from './Footer';

const MENU_ITEMS = [
  {
    id: 'steamed-veg',
    name: 'Classic Steamed Veg',
    category: 'veg',
    price: 130,
    description: 'Hand-folded dumplings stuffed with fresh mountain herbs, finely chopped cabbage, paneer, and local spices. Served with standard tomato chutney.',
    rating: 4.8,
    reviews: 150,
    image: '/steaming_momos.png',
    tag: 'Popular',
    tagType: 'yellow',
    spicyLevel: 1,
  },
  {
    id: 'jhol-veg',
    name: 'Jhol Veg Momo',
    category: 'veg',
    price: 150,
    description: 'Fresh vegetable dumplings submerged in a warm, rich, nutty tomato-soybean sesame broth (Jhol). Comfort food at its finest.',
    rating: 4.8,
    reviews: 90,
    image: '/jhol_momos.png',
    tag: 'Chef Choice',
    tagType: 'green',
    spicyLevel: 1,
  },
  {
    id: 'chilli-veg',
    name: 'C-Momo (Chilli Veg)',
    category: 'veg',
    price: 200,
    description: 'Fried vegetable momos tossed in a spicy, tangy wok-sauce with bell peppers, red onions, fresh green chillies, and green scallions.',
    rating: 4.8,
    reviews: 210,
    image: '/chilli_momos.png',
    tag: 'Spicy',
    tagType: 'red',
    spicyLevel: 3,
  },
  {
    id: 'special-chicken',
    name: 'Momo House Special',
    category: 'chicken',
    price: 250,
    description: 'Minced chicken thigh mixed with onions, cilantro, and our secret 12-spice Himalayan blend, hand-wrapped and steamed. Served with spicy peanut sesame chutney.',
    rating: 4.9,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=400',
    tag: 'Best Seller',
    tagType: 'yellow',
    spicyLevel: 2,
  },
  {
    id: 'jhol-chicken',
    name: 'Jhol Chicken Momo',
    category: 'chicken',
    price: 230,
    description: 'Our signature chicken momos served in a bowl of hot sesame-tomato soup, rich in spices and topped with coriander oil.',
    rating: 4.9,
    reviews: 185,
    image: '/jhol_momos.png',
    tag: 'House Special',
    tagType: 'green',
    spicyLevel: 2,
  },
  {
    id: 'chilli-chicken',
    name: 'C-Momo (Chilli Chicken)',
    category: 'chicken',
    price: 320,
    description: 'Fried chicken momos glazed in a fiery, sweet, and tangy chilli sauce, stir-fried with hot chillies and mixed peppers.',
    rating: 4.7,
    reviews: 320,
    image: '/chilli_momos.png',
    tag: 'Spicy',
    tagType: 'red',
    spicyLevel: 3,
  },
  {
    id: 'thukpa',
    name: 'Mountain Thukpa',
    category: 'sides',
    price: 150,
    description: 'Traditional Tibetan noodle soup with a rich spiced vegetable broth, seasonal greens, carrots, and hand-pulled wheat noodles.',
    rating: 4.6,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=400',
    tag: 'Tibetan Classic',
    tagType: 'green',
    spicyLevel: 1,
  },
  {
    id: 'chowmein',
    name: 'House Chow Mein',
    category: 'sides',
    price: 110,
    description: 'Wok-fried noodles tossed with cabbage, carrots, bell peppers, local mountain spices, and a splash of dark soy sauce.',
    rating: 4.8,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=400',
    tag: 'Comfort Food',
    tagType: 'yellow',
    spicyLevel: 1,
  },
  {
    id: 'side-salad',
    name: 'Himalayan Chickpea Salad',
    category: 'sides',
    price: 99,
    description: 'Roasted spiced chickpeas tossed with cucumbers, cherry tomatoes, red onions, fresh coriander, and a tangy lemon-cumin dressing.',
    rating: 4.5,
    reviews: 65,
    image: '/salad_bowl.png',
    tag: 'Healthy',
    tagType: 'green',
    spicyLevel: 0,
  }
];

export default function MenuTab({ onSelectDish, setActiveTab }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Feast' },
    { id: 'veg', label: 'Veg Momos' },
    { id: 'chicken', label: 'Chicken Momos' },
    { id: 'sides', label: 'Soups & Sides' }
  ];

  return (
    <div className="menu-tab animate-fade-in-up">
      <div className="menu-header">
        <h1 className="menu-title">Our Himalayan Feast</h1>
        
        {/* Search Bar */}
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search our delicious momos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs-container">
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="menu-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="item-image-wrapper" onClick={() => onSelectDish(item)}>
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.tag && (
                  <span className={`item-badge badge-${item.tagType}`}>
                    {item.tag === 'Spicy' && <Flame size={10} style={{ marginRight: 2 }} />}
                    {item.tag === 'Healthy' && <Leaf size={10} style={{ marginRight: 2 }} />}
                    {item.tag}
                  </span>
                )}
                {item.category === 'veg' && (
                  <span className="veg-indicator" title="Vegetarian">
                    <span className="veg-dot"></span>
                  </span>
                )}
              </div>
              <div className="item-details">
                <div className="item-header" onClick={() => onSelectDish(item)}>
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-price">रु {item.price.toFixed(2)}</span>
                </div>
                <p className="item-desc" onClick={() => onSelectDish(item)}>
                  {item.description.length > 80 
                    ? `${item.description.slice(0, 80)}...` 
                    : item.description}
                </p>
                <div className="item-footer">
                  <div className="item-rating" onClick={() => onSelectDish(item)}>
                    <Star size={14} className="star-icon" />
                    <span className="rating-value">{item.rating}</span>
                    <span className="reviews-count">({item.reviews}+)</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-search">
            <p>No delicious dishes matches your search.</p>
            <button className="btn-secondary" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      <style>{`
        .menu-tab { display:flex; flex-direction:column; gap:16px; padding-bottom:24px; }
        .menu-header { padding:20px 20px 0; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .menu-title { font-family:var(--font-serif); font-size:28px; color:var(--text-primary); text-align:left; margin-bottom:14px; }

        .search-bar { display:flex; align-items:center; background-color:#FFF; border:1px solid var(--border-light); border-radius:var(--border-radius-md); padding:10px 14px; gap:10px; box-shadow:var(--shadow-sm); }
        .search-icon { color:var(--text-muted); }
        .search-bar input { flex:1; border:none; background:none; outline:none; font-family:var(--font-sans); font-size:14px; color:var(--text-primary); }
        .search-bar input::placeholder { color:var(--text-muted); }

        .category-tabs-container { overflow-x:auto; scrollbar-width:none; padding:0 20px; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .category-tabs-container::-webkit-scrollbar { display:none; }
        .category-tabs { display:flex; gap:8px; padding-bottom:4px; width:max-content; }
        .category-tab-btn { background-color:#FFF; border:1px solid var(--border-light); color:var(--text-secondary); border-radius:20px; padding:8px 16px; font-family:var(--font-sans); font-weight:600; font-size:13px; cursor:pointer; transition:all var(--transition-fast); box-shadow:var(--shadow-sm); }
        .category-tab-btn:hover { border-color:var(--secondary); color:var(--secondary-hover); }
        .category-tab-btn.active { background-color:var(--secondary); border-color:var(--secondary); color:var(--text-primary); box-shadow:0 4px 8px rgba(244,182,28,0.2); font-weight:700; }

        .menu-list { padding:0 20px; display:flex; flex-direction:column; gap:18px; max-width:var(--content-max-width); margin:0 auto; width:100%; }
        .menu-item-card { background-color:#FFF; border-radius:var(--border-radius-md); overflow:hidden; box-shadow:var(--shadow-sm); border:1px solid var(--border-light); display:flex; flex-direction:column; transition:transform var(--transition-fast),box-shadow var(--transition-fast); }
        .menu-item-card:hover { transform:translateY(-2px); box-shadow:var(--shadow-md); }

        .item-image-wrapper { position:relative; width:100%; height:160px; cursor:pointer; background-color:#EFEFEF; }
        .item-image-wrapper img { width:100%; height:100%; object-fit:cover; }
        .item-badge { position:absolute; top:12px; left:12px; font-size:9px; font-weight:800; padding:3px 8px; border-radius:12px; text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
        .veg-indicator { position:absolute; top:12px; right:12px; width:18px; height:18px; background-color:white; border:1.5px solid #2E7D32; display:flex; align-items:center; justify-content:center; border-radius:3px; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
        .veg-dot { width:8px; height:8px; background-color:#2E7D32; border-radius:50%; }

        .item-details { padding:14px; display:flex; flex-direction:column; gap:6px; text-align:left; }
        .item-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; cursor:pointer; }
        .item-name { font-size:16px; font-weight:700; color:var(--text-primary); line-height:1.2; }
        .item-price { font-size:16px; font-weight:800; color:var(--primary); }
        .item-desc { font-size:12px; color:var(--text-secondary); line-height:1.4; cursor:pointer; }
        .item-footer { display:flex; justify-content:space-between; align-items:center; margin-top:4px; }
        .item-rating { display:flex; align-items:center; gap:4px; cursor:pointer; }
        .star-icon { color:var(--secondary); fill:var(--secondary); }
        .rating-value { font-size:12px; font-weight:700; color:var(--text-primary); }
        .reviews-count { font-size:11px; color:var(--text-muted); }
        .empty-search { text-align:center; padding:40px 20px; display:flex; flex-direction:column; align-items:center; gap:16px; }
        .empty-search p { font-size:14px; color:var(--text-secondary); }

        /* ═══ DESKTOP ═══ */
        @media (min-width: 768px) {
          .menu-header { padding:32px var(--content-padding) 0; }
          .menu-title { font-size:38px; margin-bottom:20px; }
          .search-bar { max-width:500px; }
          .category-tabs-container { padding:0 var(--content-padding); }
          .category-tabs { width:auto; }
          .category-tab-btn { padding:10px 22px; font-size:14px; }

          .menu-list { padding:0 var(--content-padding); display:grid; grid-template-columns:repeat(2, 1fr); gap:24px; }
          .item-image-wrapper { height:200px; }
        }

        @media (min-width: 1024px) {
          .menu-title { font-size:44px; }
          .menu-list { grid-template-columns:repeat(3, 1fr); }
          .item-image-wrapper { height:220px; }
          .item-name { font-size:18px; }
        }
      `}</style>
    </div>
  );
}
export { MENU_ITEMS };
