# Good Boy Custom Order Form - Claude Code Memory

## Project Overview
A complete vanilla HTML/CSS/JavaScript order form system for Good Boy Custom apparel with Monday.com integration. Built as a 10-step progressive form with responsive design matching the Good Boy Custom brand aesthetic.

## Key Features
- 10-step order form with progress tracking
- Monday.com API integration for order management
- Conditional product sizing (apparel vs non-sizing items like hats)
- File upload with drag-and-drop support
- LocalStorage form persistence
- Responsive design with mobile-first approach
- Good Boy Custom brand styling (green #02734e accent, clean minimalist design)

## Technical Architecture
- **Stack**: Vanilla HTML/CSS/JavaScript (no frameworks)
- **Styling**: Custom CSS with Good Boy Custom design system
- **Data**: LocalStorage for form persistence, Monday.com API for submission
- **File Structure**: Modular organization with separate config, CSS, and JS files

## Recent Implementations

### 1. Conditional Product Sizing
**Problem Solved**: Some products (like hats) don't require size selection, while apparel products need detailed size-quantity specifications.

**Solution**:
- Added `requiresSizing: false` flag to products in `config/config.js`
- Implemented conditional UI rendering in `form/details.html`
- Created dual data structures for sizing vs non-sizing products

### 2. Product-Specific Logo Placements
**Problem Solved**: Generic logo placement options weren't logical for different product types (e.g., hats don't have "chest" placement).

**Solution**:
- Created `LOGO_PLACEMENTS_BY_CATEGORY` in `config/config.js` with product-specific options:
  - **Apparel** (polos, t-shirts): Chest, back, sleeve options
  - **Outerwear**: Includes hood option in addition to apparel placements
  - **Headwear**: Front, side, back options (no chest/sleeve)
- Added helper functions in `form/details.html` to dynamically load appropriate placements

### Files Modified
1. **config/config.js**: 
   - Added `requiresSizing: false` to headwear products
   - Added `LOGO_PLACEMENTS_BY_CATEGORY` with product-specific placement options
2. **form/details.html**: 
   - Added `getProductRequiresSizing()` function for conditional sizing
   - Added `getProductCategory()` and `getLogoPlacementsForProduct()` for dynamic placements
   - Conditional template rendering for sizing vs non-sizing UI
   - Separate data management functions for both product types
3. **css/form.css**: Size-quantity grid styling already implemented

### Data Structure
```javascript
// Sizing products (apparel)
productDetails[productId] = {
  sizeQuantities: { "M": 5, "L": 10, "XL": 3 },
  sizes: ["M", "L", "XL"],
  totalQuantity: 18,
  logoPlacement: "Left Chest",
  colors: ["Black", "Navy"]
}

// Non-sizing products (hats)
productDetails[productId] = {
  quantity: 25,
  totalQuantity: 25,
  sizeQuantities: {}, // empty for compatibility
  sizes: [], // empty for compatibility
  logoPlacement: "Center",
  colors: ["Black"]
}
```

## Form Steps
1. **Welcome** - Introduction and getting started
2. **Project Type** - Corporate, Golf, Team Sports, etc.
3. **Products** - Product category and item selection
4. **Details** - Size/quantity, colors, logo placement (CONDITIONAL SIZING IMPLEMENTED)
5. **Customization** - Logo style, budget, delivery preferences
6. **Custom Items** - Additional custom item descriptions
7. **Logo Upload** - File upload with drag-and-drop
8. **Contact** - Customer contact information
9. **Review** - Complete order review before submission
10. **Success** - Confirmation and next steps

## API Integration
- **Monday.com**: Configured for order submission (requires API token and board ID)
- **File Upload**: Handles images and PDFs up to 15MB

## Styling Guidelines
- **Primary Green**: #02734e
- **Typography**: Clean, modern sans-serif
- **Layout**: Card-based design with subtle shadows
- **Responsive**: Mobile-first with breakpoints at 768px and 480px

## Development Commands
```bash
# Start local development server
python3 -m http.server 8000 --bind 127.0.0.1

# Navigate to form
http://localhost:8000/form/welcome.html
```

## Configuration
Update `config/config.js` for:
- Monday.com API credentials
- Product catalog modifications
- Project types and customization options
- File upload settings

## Testing Notes
- All form steps persist data to localStorage
- Size-quantity validation works for both product types
- File upload supports drag-and-drop and click-to-select
- Mobile responsive design tested on various screen sizes

## Future Enhancements
- Real Monday.com API integration (currently simulated)
- Advanced product customization options
- Multi-language support
- Enhanced file preview capabilities

---
*This project demonstrates advanced vanilla JavaScript form handling with complex conditional logic and modern web development practices.*