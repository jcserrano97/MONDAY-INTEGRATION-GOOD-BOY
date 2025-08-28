# Good Boy Custom - Vanilla HTML/CSS/JS Website

A complete custom apparel ordering website built with vanilla HTML, CSS, and JavaScript. Features a 10-step order form with Monday.com integration and professional Good Boy Custom branding.

## 🚀 Features

- **Professional Homepage** - Clean, modern design matching Good Boy Custom aesthetic
- **10-Step Order Form** - Guided multi-step process for custom apparel orders
- **Product Catalog** - Interactive product selection with categories and filtering
- **File Upload** - Drag-and-drop logo and design file uploads
- **Monday.com Integration** - Automatic project creation and file uploads
- **Form State Management** - Auto-save progress with localStorage
- **Responsive Design** - Mobile-first CSS with full responsive support
- **Progress Tracking** - Visual progress indicators throughout the form

## 📁 File Structure

```
good-boy-custom/
├── index.html                 # Homepage
├── form/
│   ├── welcome.html          # Step 1: Contact info
│   ├── project-type.html     # Step 2: Project selection
│   ├── products.html         # Step 3: Product catalog
│   ├── details.html          # Step 4: Product details
│   ├── customization.html    # Step 5: Preferences
│   ├── custom-items.html     # Step 6: Custom items
│   ├── logo-upload.html      # Step 7: File upload
│   ├── contact.html          # Step 8: Final details
│   ├── review.html           # Step 9: Order review
│   └── success.html          # Step 10: Confirmation
├── css/
│   ├── styles.css            # Global styles
│   ├── components.css        # UI components
│   └── form.css              # Form-specific styles
├── js/
│   ├── app.js                # Main application
│   ├── form-manager.js       # Form state management
│   ├── monday-api.js         # Monday.com integration
│   ├── file-upload.js        # File handling
│   └── utils.js              # Helper functions
├── assets/
│   ├── images/               # Product images
│   └── logos/                # Brand assets
└── config/
    └── config.js             # Configuration
```

## 🎨 Design System

Based on Good Boy Custom's aesthetic:
- **Colors**: Clean whites, deep greens (#02734e), professional grays
- **Typography**: Futura font family with clean spacing
- **Layout**: Modular grid system with generous white space
- **Components**: Professional cards, buttons, and form elements

## ⚙️ Setup Instructions

### 1. Configure Monday.com Integration

Edit `config/config.js` and update:

```javascript
const CONFIG = {
  MONDAY_API_TOKEN: 'your_monday_api_token_here',
  MONDAY_BOARD_ID: 'your_board_id_here',
  // ... rest of config
};
```

### 2. Deploy to Web Server

Upload all files to your web server. The site works with:
- Static hosting (GitHub Pages, Netlify, Vercel)
- Traditional web servers (Apache, Nginx)
- CDNs (CloudFlare, AWS CloudFront)

### 3. Test Functionality

1. Open `index.html` in a web browser
2. Click "Start Your Order" to test the form flow
3. Complete the form steps to verify functionality
4. Check Monday.com for submitted orders

## 🔧 Configuration Options

### Product Categories
Add/modify products in `config/config.js`:

```javascript
PRODUCT_CATEGORIES: [
  {
    id: 'polos',
    name: 'Polo Shirts',
    description: 'Classic and performance polos',
    products: [
      { id: 'polo-classic', name: 'Classic Cotton Polo', price: '$45', icon: '👔' }
    ]
  }
]
```

### Project Types
Customize project types in `config/config.js`:

```javascript
PROJECT_TYPES: [
  {
    id: 'corporate',
    title: 'Corporate Apparel',
    description: 'Branded clothing for employees',
    features: ['Logo embroidery', 'Professional appearance'],
    icon: '🏢'
  }
]
```

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized mobile navigation

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔗 Monday.com Integration

### Board Setup
Your Monday.com board should have columns for:
- Email (text)
- Name (text) 
- Company (text)
- Phone (text)
- Project Type (text)
- Product Count (numbers)
- Custom Items Count (numbers)
- Status (status)

### API Features
- Automatic project creation
- Detailed order updates
- File uploads
- Status tracking

## 🚀 Going Live

### Domain Setup
1. Point your domain to your hosting provider
2. Enable SSL certificate
3. Configure any needed redirects
4. Test all form functionality

### Analytics (Optional)
Add Google Analytics or similar tracking:

```html
<!-- Add to all HTML files in <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🛠️ Customization

### Styling
- Modify CSS custom properties in `styles.css` for color scheme
- Adjust component styles in `components.css`
- Update form layouts in `form.css`

### Content
- Edit HTML files for text content
- Update product data in `config/config.js`
- Replace placeholder images in `assets/`

## 📧 Support

For technical support or customizations, contact the development team.

## 📄 License

This project is created for Good Boy Custom. All rights reserved.

---

**Built with ❤️ using Vanilla HTML, CSS & JavaScript**