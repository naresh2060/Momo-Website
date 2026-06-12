export const APP_CONFIG = {
    company: 'मिठो MOMO',
    tagline: 'Taste the Himalayan Soul',
    currency: '₹',
    vatRate: 5,
    deliveryFee: 40,
    minOrder: 200,
    defaultLanguage: 'en',
    supportedLanguages: [
        { code: 'en', label: 'English' },
        { code: 'ne', label: 'Nepali' },
    ],
    theme: {
        primary: '#8B0015',   // Deep Red (Similar to your orange but richer)
        primaryDark: '#6A0010', // Darker Red
        primaryLight: '#D32F2F',// Lighter Red
        secondary: '#FF8A65', // Soft Orange for accents
        accent: '#F4D03F',    // Golden Yellow for highlights
        background: '#FDF6F3',// Cream/Beige
        card: '#FFFFFF',
        text: '#2C2C2C',
        textSecondary: '#5A5A5A',
        border: '#E0E0E0',
        error: '#D32F2F',
        success: '#388E3C',
        warning: '#FBC02D',
    },
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.momoshop.com',
    contact: {
        phone: '+977-9812345678',
        email: 'namaste@mithomomo.com',
        address: 'Balkot, Bhaktapur, Nepal',
        googleMapsUrl: 'https://maps.app.goo.gl/ZrhLUWr9sxd9skmp6',
    },
    hours: {
        monday: { open: '11:00', close: '22:00' },
        tuesday: { open: '11:00', close: '22:00' },
        wednesday: { open: '11:00', close: '22:00' },
        thursday: { open: '11:00', close: '22:00' },
        friday: { open: '11:00', close: '23:00' },
        saturday: { open: '11:00', close: '23:00' },
        sunday: { open: '12:00', close: '21:00' },
    },
    payment: [
        'cash_on_delivery',
        'esewa',
        'khalti',
        'connect_ips',
    ],
    social: {
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        tiktok: 'https://tiktok.com/',
    },
    images: {
        logo: '/logo.svg',
        hero: '/hero.jpg',
        menu: '/menu.jpg',
        about: '/about.jpg',
        contact: '/contact.jpg',
    },
};