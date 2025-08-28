const CONFIG = {
  MONDAY_API_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjU1MjI4MDk3MSwiYWFpIjoxMSwidWlkIjo3MzUxMzYwMywiaWFkIjoiMjAyNS0wOC0yMFQwMDozNTozMS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTk2MTQ3MTMsInJnbiI6InVzZTEifQ.Cbbb7StzHI7c2_DatJK1dYMoIdiSPTJsuWqiDKegrjg',
  MONDAY_BOARD_ID: '8702267862',
  
  APP_NAME: 'Good Boy Custom',
  VERSION: '1.0.0',
  
  MAX_FILE_SIZE: 15 * 1024 * 1024,
  MAX_FILES: 10,
  ALLOWED_FILE_TYPES: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg+xml',
    'application/pdf'
  ],
  
  CUSTOM_PRODUCTS: [
    {
      id: 'custom-mens-polo',
      name: 'Custom Men\'s Performance Polo',
      description: 'Premium performance polo shirts for men',
      category: 'Men\'s Apparel',
      image: 'https://goodboycustom.com/cdn/shop/collections/PerformaceBlackTucked_7e4b377f-c56b-4be5-9bda-a217369bdae4.png',
      icon: '👔'
    },
    {
      id: 'custom-ladies-polo',
      name: 'Custom Ladies\' Performance Polo',
      description: 'Stylish performance polo shirts for women',
      category: 'Ladies\' Apparel',
      image: 'https://goodboycustom.com/cdn/shop/collections/IMG_0304_e4d0c3e5-e69b-47cb-a9cf-1f1d9429bef0.jpg',
      icon: '👕'
    },
    {
      id: 'custom-junior-apparel',
      name: 'Custom Junior Golf Apparel',
      description: 'Quality golf apparel designed for young athletes',
      category: 'Juniors\' Apparel',
      image: 'https://goodboycustom.com/cdn/shop/collections/IMG_0470.jpg',
      icon: '⛳'
    },
    {
      id: 'custom-corporate-gifts',
      name: 'Custom Corporate Gifts & Gear',
      description: 'Professional branded items for corporate events',
      category: 'Corporate Gifts',
      image: 'https://goodboycustom.com/cdn/shop/collections/IMG_0351_bd17b2ce-994a-400c-b0fd-2390f6c5e6ce.jpg',
      icon: '🎁'
    },
    {
      id: 'custom-headwear',
      name: 'Custom Headwear',
      description: 'Personalized hats and caps for any style',
      category: 'Headwear',
      image: 'https://goodboycustom.com/cdn/shop/collections/custom_hat_website_1.25.jpg',
      icon: '🧢'
    },
    {
      id: 'custom-bags',
      name: 'Custom Leather & Shoe Bags',
      description: 'Premium custom bags for golf and travel',
      category: 'Bags',
      image: 'https://goodboycustom.com/cdn/shop/collections/IMG_0306.jpg',
      icon: '🎒'
    },
    {
      id: 'custom-golf-accessories',
      name: 'Custom Golf Accessories',
      description: 'Professional golf accessories and gear',
      category: 'Golf Accessories',
      image: 'https://goodboycustom.com/cdn/shop/collections/IMG_0343_1bf98adc-ed09-4ac4-8626-b6d305f0f012.jpg',
      icon: '⛳'
    },
    {
      id: 'custom-drinkware',
      name: 'Custom Insulated Drinkware',
      description: 'Premium insulated tumblers and drinkware',
      category: 'Insulated Drinkware',
      image: 'https://goodboycustom.com/cdn/shop/collections/White_stanley_e966d848-b37a-4779-8c0f-b183a64461a5.jpg',
      icon: '🥤'
    }
  ],

  STYLE_PREFERENCES: [
    {
      id: 'minimal-modern',
      title: 'Minimal & Modern',
      description: 'Clean, sophisticated designs with subtle branding',
      features: ['Simple logos', 'Professional appearance', 'Neutral colors', 'Classic fonts'],
      icon: '✨'
    },
    {
      id: 'balanced-creative',
      title: 'Balanced & Creative',
      description: 'Perfect blend of professional and creative elements',
      features: ['Balanced design', 'Versatile styling', 'Mixed color palettes', 'Modern touches'],
      icon: '🎯'
    },
    {
      id: 'bold-colorful',
      title: 'Bold & Colorful',
      description: 'Eye-catching, vibrant designs that stand out',
      features: ['Bright colors', 'Creative graphics', 'Unique patterns', 'Bold statements'],
      icon: '🌈'
    }
  ],
  
  PROJECT_TYPES: [
    {
      id: 'corporate',
      title: 'Corporate Apparel',
      description: 'Branded clothing for employees, events, or promotions',
      features: ['Logo embroidery', 'Professional appearance', 'Bulk orders'],
      icon: '🏢'
    },
    {
      id: 'golf-apparel',
      title: 'Golf Apparel/Private Club',
      description: 'Performance golf clothing for players, teams, and private clubs',
      features: ['Moisture-wicking', 'Golf-specific fit', 'Tournament ready'],
      icon: '⛳'
    },
    {
      id: 'team-sports',
      title: 'Team Sports',
      description: 'Custom uniforms and fan gear for sports teams',
      features: ['Team colors', 'Player names', 'Durable materials'],
      icon: '🏈'
    },
    {
      id: 'special-events',
      title: 'Special Events',
      description: 'Custom apparel for weddings, parties, or celebrations',
      features: ['Unique designs', 'Memorable keepsakes', 'Small batches'],
      icon: '🎉'
    },
    {
      id: 'charity-event',
      title: 'Charity Event',
      description: 'Custom apparel for fundraising events and charitable causes',
      features: ['Cause awareness', 'Fundraising support', 'Community impact'],
      icon: '❤️'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Not sure? We can help you find the right solution',
      features: ['Consultation included', 'Flexible options', 'Expert guidance'],
      icon: '💡'
    }
  ],
  
  SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  
  COLORS: [
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#1f2937' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Gray', hex: '#6b7280' },
    { name: 'Red', hex: '#dc2626' },
    { name: 'Blue', hex: '#2563eb' },
    { name: 'Green', hex: '#16a34a' },
    { name: 'Purple', hex: '#9333ea' }
  ],
  
  LOGO_PLACEMENTS_BY_CATEGORY: {
    polos: [
      'Left Chest',
      'Right Chest', 
      'Center Chest',
      'Back Center',
      'Left Sleeve',
      'Right Sleeve',
      'Multiple Locations'
    ],
    tshirts: [
      'Left Chest',
      'Right Chest',
      'Center Chest', 
      'Back Center',
      'Back Large',
      'Left Sleeve',
      'Right Sleeve',
      'Multiple Locations'
    ],
    outerwear: [
      'Left Chest',
      'Right Chest',
      'Center Chest',
      'Back Center',
      'Back Large',
      'Left Sleeve',
      'Right Sleeve',
      'Hood',
      'Multiple Locations'
    ],
    headwear: [
      'Front Center',
      'Front Left',
      'Front Right',
      'Side',
      'Back',
      'Multiple Locations'
    ]
  },
  
  // Fallback for backward compatibility
  LOGO_PLACEMENTS: [
    'Left Chest',
    'Right Chest',
    'Center Chest',
    'Back',
    'Sleeve',
    'Multiple Locations'
  ],
  
  FORM_STEPS: [
    { id: 1, name: 'Welcome', path: 'welcome.html' },
    { id: 2, name: 'Project Type', path: 'project-type.html' },
    { id: 3, name: 'Style', path: 'style.html' },
    { id: 4, name: 'Products', path: 'products.html' },
    { id: 5, name: 'Customization', path: 'customization.html' },
    { id: 6, name: 'Custom Items', path: 'custom-items.html' },
    { id: 7, name: 'Logo Upload', path: 'logo-upload.html' },
    { id: 8, name: 'Review', path: 'review.html' },
    { id: 9, name: 'Success', path: 'success.html' }
  ]
};

window.CONFIG = CONFIG;