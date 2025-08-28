# Good Boy Custom - HTML/CSS/JavaScript Version

A simplified version of the Good Boy Custom application built with pure HTML, CSS, and JavaScript - no frameworks required!

## 🎯 Project Overview

This document outlines how to recreate the same functionality as the Next.js version using only vanilla web technologies. Perfect for developers who prefer simpler tooling or need a lightweight solution.

## 🌟 Features (Same as Next.js Version)

- **Multi-step Form** - 10 progressive steps with navigation
- **Monday.com Integration** - Direct API calls for project creation
- **File Upload** - Drag-and-drop with Monday.com storage
- **Responsive Design** - Mobile-first CSS Grid/Flexbox
- **Data Persistence** - LocalStorage for form state
- **Professional UI** - Good Boy Custom branding

## 📁 File Structure

```
good-boy-custom-vanilla/
├── index.html                 # Homepage
├── form/
│   ├── index.html            # Form landing page
│   ├── welcome.html          # Step 1: Contact info
│   ├── project-type.html     # Step 2: Project selection
│   ├── products.html         # Step 3: Product catalog
│   ├── details.html          # Step 4: Product details
│   ├── customization.html    # Step 5: Preferences
│   ├── custom-items.html     # Step 6: Bespoke items
│   ├── logo-upload.html      # Step 7: File upload
│   ├── contact.html          # Step 8: Final details
│   ├── review.html           # Step 9: Order review
│   └── success.html          # Step 10: Confirmation
├── css/
│   ├── styles.css            # Global styles
│   ├── components.css        # Reusable components
│   └── form.css              # Form-specific styles
├── js/
│   ├── app.js                # Main application logic
│   ├── form-manager.js       # Form state management
│   ├── monday-api.js         # Monday.com integration
│   ├── file-upload.js        # File handling
│   └── utils.js              # Helper functions
├── assets/
│   ├── images/               # Product images, icons
│   └── logos/                # Brand assets
└── config/
    └── config.js             # API keys and settings
```

## 🎨 CSS Implementation

### **1. Global Styles (css/styles.css)**

```css
/* Good Boy Custom Theme */
:root {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-muted: #a3a3a3;
  --accent-primary: #84ff00;
  --accent-hover: #75e600;
  --border-color: #333333;
  --card-bg: rgba(26, 26, 26, 0.5);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

/* Layout Components */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 1.5rem;
    cursor: pointer;
  }
}
```

### **2. Component Styles (css/components.css)**

```css
/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
}

/* Cards */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  color: var(--text-muted);
  font-size: 0.875rem;
}

/* Form Elements */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-primary);
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(132, 255, 0, 0.2);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

/* Progress Bar */
.progress-container {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.75rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-secondary);
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}

.step.active .step-number {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

.step.completed .step-number {
  background: var(--accent-primary);
  color: var(--bg-primary);
}

/* File Upload */
.file-upload {
  border: 2px dashed var(--border-color);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.file-upload:hover {
  border-color: var(--accent-primary);
}

.file-upload.dragover {
  border-color: var(--accent-primary);
  background: rgba(132, 255, 0, 0.1);
}

/* Grid Layouts */
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### **3. Form Styles (css/form.css)**

```css
/* Form Layout */
.form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

/* Product Selection */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.product-card {
  background: var(--card-bg);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.product-card.selected {
  border-color: var(--accent-primary);
  background: rgba(132, 255, 0, 0.1);
}

.product-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.product-name {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-price {
  color: var(--accent-primary);
  font-weight: 600;
}

/* Size and Color Selection */
.selection-group {
  margin: 1rem 0;
}

.selection-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.selection-option {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.selection-option:hover {
  border-color: var(--accent-primary);
}

.selection-option.selected {
  background: var(--accent-primary);
  color: var(--bg-primary);
  border-color: var(--accent-primary);
}

/* Color swatches */
.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
}

.color-swatch.selected {
  border-color: var(--accent-primary);
}

.color-swatch::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Loading States */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--bg-secondary);
  border-top: 2px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Animations */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

## 🔧 JavaScript Implementation

### **1. Main Application (js/app.js)**

```javascript
// Main Application Controller
class GoodBoyCustomApp {
  constructor() {
    this.formManager = new FormManager();
    this.mondayAPI = new MondayAPI();
    this.fileUpload = new FileUpload();
    
    this.init();
  }

  init() {
    // Initialize app components
    this.setupNavigation();
    this.setupEventListeners();
    this.loadSavedData();
    
    // Initialize current page
    const currentPage = this.getCurrentPage();
    this.initializePage(currentPage);
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || 'index';
  }

  initializePage(pageName) {
    switch(pageName) {
      case 'welcome':
        this.initWelcomePage();
        break;
      case 'project-type':
        this.initProjectTypePage();
        break;
      case 'products':
        this.initProductsPage();
        break;
      case 'details':
        this.initDetailsPage();
        break;
      case 'customization':
        this.initCustomizationPage();
        break;
      case 'custom-items':
        this.initCustomItemsPage();
        break;
      case 'logo-upload':
        this.initLogoUploadPage();
        break;
      case 'contact':
        this.initContactPage();
        break;
      case 'review':
        this.initReviewPage();
        break;
      case 'success':
        this.initSuccessPage();
        break;
      default:
        this.initHomePage();
    }
  }

  setupNavigation() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }

    // Form navigation
    this.setupFormNavigation();
  }

  setupFormNavigation() {
    const prevBtn = document.querySelector('.btn-previous');
    const nextBtn = document.querySelector('.btn-next');
    const form = document.querySelector('.form-step');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToPreviousStep();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToNextStep();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });
    }
  }

  setupEventListeners() {
    // Auto-save form data
    document.addEventListener('input', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.autoSaveFormData();
      }
    });

    // Handle page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.saveFormData();
      }
    });

    // Handle beforeunload
    window.addEventListener('beforeunload', () => {
      this.saveFormData();
    });
  }

  // Page Initialization Methods
  initWelcomePage() {
    this.updateProgressBar(1, 10);
    this.loadContactInfo();
  }

  initProjectTypePage() {
    this.updateProgressBar(2, 10);
    this.setupProjectTypeSelection();
  }

  initProductsPage() {
    this.updateProgressBar(3, 10);
    this.loadProductCatalog();
    this.setupProductSelection();
  }

  initDetailsPage() {
    this.updateProgressBar(4, 10);
    this.loadSelectedProducts();
    this.setupProductDetails();
  }

  initCustomizationPage() {
    this.updateProgressBar(5, 10);
    this.setupCustomizationOptions();
  }

  initCustomItemsPage() {
    this.updateProgressBar(6, 10);
    this.setupCustomItemsForm();
  }

  initLogoUploadPage() {
    this.updateProgressBar(7, 10);
    this.fileUpload.init();
  }

  initContactPage() {
    this.updateProgressBar(8, 10);
    this.loadContactInfo();
  }

  initReviewPage() {
    this.updateProgressBar(9, 10);
    this.loadOrderReview();
  }

  initSuccessPage() {
    this.updateProgressBar(10, 10);
    this.displaySuccessMessage();
  }

  // Navigation Methods
  goToPreviousStep() {
    const currentStep = this.getCurrentStep();
    if (currentStep > 1) {
      this.navigateToStep(currentStep - 1);
    }
  }

  goToNextStep() {
    if (this.validateCurrentStep()) {
      this.saveFormData();
      const currentStep = this.getCurrentStep();
      this.navigateToStep(currentStep + 1);
    }
  }

  navigateToStep(stepNumber) {
    const stepPages = [
      'welcome',
      'project-type', 
      'products',
      'details',
      'customization',
      'custom-items',
      'logo-upload',
      'contact',
      'review',
      'success'
    ];

    if (stepNumber >= 1 && stepNumber <= stepPages.length) {
      window.location.href = `${stepPages[stepNumber - 1]}.html`;
    }
  }

  getCurrentStep() {
    const stepPages = {
      'welcome': 1,
      'project-type': 2,
      'products': 3,
      'details': 4,
      'customization': 5,
      'custom-items': 6,
      'logo-upload': 7,
      'contact': 8,
      'review': 9,
      'success': 10
    };

    const currentPage = this.getCurrentPage();
    return stepPages[currentPage] || 1;
  }

  // Form Management
  validateCurrentStep() {
    const currentPage = this.getCurrentPage();
    
    switch(currentPage) {
      case 'welcome':
        return this.validateContactInfo();
      case 'project-type':
        return this.validateProjectType();
      case 'products':
        return this.validateProductSelection();
      case 'details':
        return this.validateProductDetails();
      default:
        return true;
    }
  }

  validateContactInfo() {
    const email = document.querySelector('#email')?.value;
    const name = document.querySelector('#contact-name')?.value;
    
    if (!email || !name) {
      this.showError('Please fill in all required fields');
      return false;
    }

    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address');
      return false;
    }

    return true;
  }

  validateProjectType() {
    const selectedType = document.querySelector('.project-type.selected');
    if (!selectedType) {
      this.showError('Please select a project type');
      return false;
    }
    return true;
  }

  validateProductSelection() {
    const selectedProducts = document.querySelectorAll('.product-card.selected');
    if (selectedProducts.length === 0) {
      this.showError('Please select at least one product');
      return false;
    }
    return true;
  }

  // Utility Methods
  updateProgressBar(currentStep, totalSteps) {
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar) {
      const percentage = (currentStep / totalSteps) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    if (progressText) {
      progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    }

    // Update step indicators
    this.updateStepIndicators(currentStep);
  }

  updateStepIndicators(currentStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      
      if (stepNumber < currentStep) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (stepNumber === currentStep) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = `
        background: #dc2626;
        color: white;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `;
      
      const form = document.querySelector('.form-step');
      if (form) {
        form.insertBefore(errorDiv, form.firstChild);
      }
    }

    errorDiv.innerHTML = `
      <span>⚠️</span>
      <span>${message}</span>
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  showSuccess(message) {
    // Similar to showError but with green styling
    let successDiv = document.querySelector('.success-message');
    
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'success-message';
      successDiv.style.cssText = `
        background: var(--accent-primary);
        color: var(--bg-primary);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `;
      
      const form = document.querySelector('.form-step');
      if (form) {
        form.insertBefore(successDiv, form.firstChild);
      }
    }

    successDiv.innerHTML = `
      <span>✅</span>
      <span>${message}</span>
    `;

    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }

  // Data Management
  saveFormData() {
    this.formManager.saveCurrentStep();
  }

  loadSavedData() {
    this.formManager.loadSavedData();
  }

  autoSaveFormData() {
    // Debounced auto-save
    clearTimeout(this.autoSaveTimeout);
    this.autoSaveTimeout = setTimeout(() => {
      this.saveFormData();
    }, 1000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new GoodBoyCustomApp();
});
```

### **2. Form Manager (js/form-manager.js)**

```javascript
// Form State Management
class FormManager {
  constructor() {
    this.storageKey = 'goodboy-form-data';
    this.formData = this.getDefaultFormData();
    this.loadSavedData();
  }

  getDefaultFormData() {
    return {
      contactInfo: {
        email: '',
        contactName: '',
        companyName: '',
        phone: ''
      },
      projectType: '',
      selectedProducts: [],
      productDetails: {},
      customization: {},
      customItems: [],
      uploadedFiles: [],
      status: 'draft',
      submissionId: null,
      mondayItemId: null
    };
  }

  saveCurrentStep() {
    const currentPage = this.getCurrentPage();
    
    switch(currentPage) {
      case 'welcome':
        this.saveContactInfo();
        break;
      case 'project-type':
        this.saveProjectType();
        break;
      case 'products':
        this.saveProductSelection();
        break;
      case 'details':
        this.saveProductDetails();
        break;
      case 'customization':
        this.saveCustomization();
        break;
      case 'custom-items':
        this.saveCustomItems();
        break;
      case 'contact':
        this.saveContactInfo();
        break;
    }

    this.saveToLocalStorage();
  }

  saveContactInfo() {
    const email = document.querySelector('#email')?.value || '';
    const contactName = document.querySelector('#contact-name')?.value || '';
    const companyName = document.querySelector('#company-name')?.value || '';
    const phone = document.querySelector('#phone')?.value || '';

    this.formData.contactInfo = {
      email,
      contactName,
      companyName,
      phone
    };
  }

  saveProjectType() {
    const selected = document.querySelector('.project-type.selected');
    if (selected) {
      this.formData.projectType = selected.dataset.type;
    }
  }

  saveProductSelection() {
    const selectedProducts = document.querySelectorAll('.product-card.selected');
    this.formData.selectedProducts = Array.from(selectedProducts).map(card => ({
      id: card.dataset.productId,
      name: card.querySelector('.product-name').textContent,
      category: card.dataset.category,
      price: card.querySelector('.product-price').textContent
    }));
  }

  saveProductDetails() {
    const products = {};
    
    this.formData.selectedProducts.forEach(product => {
      const productSection = document.querySelector(`[data-product-id="${product.id}"]`);
      if (productSection) {
        products[product.id] = {
          quantity: productSection.querySelector('.quantity-input')?.value || 1,
          sizes: this.getSelectedValues(productSection, '.size-option.selected'),
          colors: this.getSelectedValues(productSection, '.color-option.selected'),
          logoPlacement: productSection.querySelector('.logo-placement')?.value || '',
          notes: productSection.querySelector('.product-notes')?.value || ''
        };
      }
    });

    this.formData.productDetails = products;
  }

  saveCustomization() {
    const logoPlacement = document.querySelector('input[name="logo-placement"]:checked')?.value || '';
    const colorTheme = document.querySelector('input[name="color-theme"]:checked')?.value || '';
    const sizeRange = document.querySelector('input[name="size-range"]:checked')?.value || '';
    const specialInstructions = document.querySelector('#special-instructions')?.value || '';

    this.formData.customization = {
      logoPlacement,
      colorTheme,
      sizeRange,
      specialInstructions
    };
  }

  saveCustomItems() {
    const customItemsContainer = document.querySelector('#custom-items-container');
    const items = [];

    if (customItemsContainer) {
      const itemElements = customItemsContainer.querySelectorAll('.custom-item');
      
      itemElements.forEach((item, index) => {
        const description = item.querySelector('.item-description')?.value || '';
        const creativeFreedom = item.querySelector('.creative-freedom')?.checked || false;
        const requirements = item.querySelector('.special-requirements')?.value || '';

        if (description.trim()) {
          items.push({
            id: `custom-${Date.now()}-${index}`,
            description,
            creativeFreedom,
            requirements
          });
        }
      });
    }

    this.formData.customItems = items;
  }

  loadSavedData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.formData = { ...this.formData, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }

  populateCurrentStep() {
    const currentPage = this.getCurrentPage();
    
    switch(currentPage) {
      case 'welcome':
      case 'contact':
        this.populateContactInfo();
        break;
      case 'project-type':
        this.populateProjectType();
        break;
      case 'products':
        this.populateProductSelection();
        break;
      case 'details':
        this.populateProductDetails();
        break;
      case 'customization':
        this.populateCustomization();
        break;
      case 'custom-items':
        this.populateCustomItems();
        break;
      case 'review':
        this.populateReview();
        break;
    }
  }

  populateContactInfo() {
    const { contactInfo } = this.formData;
    
    this.setInputValue('#email', contactInfo.email);
    this.setInputValue('#contact-name', contactInfo.contactName);
    this.setInputValue('#company-name', contactInfo.companyName);
    this.setInputValue('#phone', contactInfo.phone);
  }

  populateProjectType() {
    if (this.formData.projectType) {
      const typeElement = document.querySelector(`[data-type="${this.formData.projectType}"]`);
      if (typeElement) {
        typeElement.classList.add('selected');
      }
    }
  }

  populateProductSelection() {
    this.formData.selectedProducts.forEach(product => {
      const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
      if (productCard) {
        productCard.classList.add('selected');
      }
    });
  }

  populateProductDetails() {
    Object.entries(this.formData.productDetails).forEach(([productId, details]) => {
      const section = document.querySelector(`[data-product-id="${productId}"]`);
      if (section) {
        this.setInputValue(section.querySelector('.quantity-input'), details.quantity);
        this.setInputValue(section.querySelector('.logo-placement'), details.logoPlacement);
        this.setInputValue(section.querySelector('.product-notes'), details.notes);
        
        // Set selected sizes and colors
        details.sizes?.forEach(size => {
          const sizeOption = section.querySelector(`[data-size="${size}"]`);
          if (sizeOption) sizeOption.classList.add('selected');
        });

        details.colors?.forEach(color => {
          const colorOption = section.querySelector(`[data-color="${color}"]`);
          if (colorOption) colorOption.classList.add('selected');
        });
      }
    });
  }

  populateReview() {
    const reviewContainer = document.querySelector('#review-content');
    if (!reviewContainer) return;

    reviewContainer.innerHTML = this.generateReviewHTML();
  }

  generateReviewHTML() {
    const { contactInfo, projectType, selectedProducts, customItems } = this.formData;
    
    return `
      <div class="review-section">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${contactInfo.contactName}</p>
        <p><strong>Email:</strong> ${contactInfo.email}</p>
        ${contactInfo.companyName ? `<p><strong>Company:</strong> ${contactInfo.companyName}</p>` : ''}
        ${contactInfo.phone ? `<p><strong>Phone:</strong> ${contactInfo.phone}</p>` : ''}
      </div>

      <div class="review-section">
        <h3>Project Type</h3>
        <p>${projectType}</p>
      </div>

      <div class="review-section">
        <h3>Selected Products (${selectedProducts.length})</h3>
        ${selectedProducts.map(product => `
          <div class="review-product">
            <h4>${product.name}</h4>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        `).join('')}
      </div>

      ${customItems.length > 0 ? `
        <div class="review-section">
          <h3>Custom Items (${customItems.length})</h3>
          ${customItems.map(item => `
            <div class="review-custom-item">
              <p><strong>Description:</strong> ${item.description}</p>
              <p><strong>Creative Freedom:</strong> ${item.creativeFreedom ? 'Yes' : 'No'}</p>
              ${item.requirements ? `<p><strong>Requirements:</strong> ${item.requirements}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  // Utility Methods
  getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop().replace('.html', '') || 'index';
  }

  setInputValue(selector, value) {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (element && value !== undefined && value !== null) {
      element.value = value;
    }
  }

  getSelectedValues(container, selector) {
    return Array.from(container.querySelectorAll(selector))
      .map(el => el.dataset.value || el.textContent.trim())
      .filter(Boolean);
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }

  clearSavedData() {
    localStorage.removeItem(this.storageKey);
    this.formData = this.getDefaultFormData();
  }

  getFormData() {
    return { ...this.formData };
  }

  setFormData(data) {
    this.formData = { ...this.formData, ...data };
    this.saveToLocalStorage();
  }

  isFormComplete() {
    const { contactInfo, projectType, selectedProducts } = this.formData;
    
    return !!(
      contactInfo.email &&
      contactInfo.contactName &&
      projectType &&
      selectedProducts.length > 0
    );
  }

  getCompletionPercentage() {
    let completed = 0;
    const total = 8; // Total number of steps to check

    if (this.formData.contactInfo.email && this.formData.contactInfo.contactName) completed++;
    if (this.formData.projectType) completed++;
    if (this.formData.selectedProducts.length > 0) completed++;
    if (Object.keys(this.formData.productDetails).length > 0) completed++;
    if (Object.keys(this.formData.customization).length > 0) completed++;
    if (this.formData.customItems.length > 0) completed++;
    if (this.formData.uploadedFiles.length > 0) completed++;
    if (this.formData.submissionId) completed++;

    return Math.round((completed / total) * 100);
  }
}
```

### **3. Monday.com API Integration (js/monday-api.js)**

```javascript
// Monday.com API Integration
class MondayAPI {
  constructor() {
    // These should be loaded from config.js
    this.apiToken = CONFIG.MONDAY_API_TOKEN;
    this.boardId = CONFIG.MONDAY_BOARD_ID;
    this.apiUrl = 'https://api.monday.com/v2';
  }

  async makeRequest(query, variables = {}) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': this.apiToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`Monday.com API Error: ${result.errors[0].message}`);
      }

      return result.data;
    } catch (error) {
      console.error('Monday.com API request failed:', error);
      throw error;
    }
  }

  async createProject(formData) {
    const projectName = `${formData.contactInfo.contactName} - ${formData.projectType} (${Date.now()})`;
    
    const columnValues = {
      email: {
        email: formData.contactInfo.email,
        text: formData.contactInfo.email
      },
      phone: formData.contactInfo.phone || '',
      company: formData.contactInfo.companyName || '',
      project_type: formData.projectType || '',
      product_count: formData.selectedProducts.length,
      custom_item_count: formData.customItems.length,
      status: { label: 'New Submission' }
    };

    const query = `
      mutation create_item($board_id: ID!, $item_name: String!, $column_values: JSON!) {
        create_item(
          board_id: $board_id,
          item_name: $item_name,
          column_values: $column_values
        ) {
          id
          name
          url
          created_at
        }
      }
    `;

    const variables = {
      board_id: this.boardId,
      item_name: projectName,
      column_values: JSON.stringify(columnValues)
    };

    const result = await this.makeRequest(query, variables);
    return result.create_item;
  }

  async uploadFile(itemId, file) {
    try {
      const formData = new FormData();
      
      formData.append('query', `
        mutation add_file($item_id: ID!, $file: File!) {
          add_file_to_item(item_id: $item_id, file: $file) {
            id
            name
            url
            file_size
            created_at
          }
        }
      `);
      
      formData.append('variables', JSON.stringify({
        item_id: itemId
      }));
      
      formData.append('file', file);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': this.apiToken
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`File upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`File upload error: ${result.errors[0].message}`);
      }

      return result.data.add_file_to_item;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  async updateProject(itemId, updates) {
    const query = `
      mutation change_column_values($item_id: ID!, $board_id: ID!, $column_values: JSON!) {
        change_multiple_column_values(
          item_id: $item_id,
          board_id: $board_id,
          column_values: $column_values
        ) {
          id
          name
        }
      }
    `;

    const variables = {
      item_id: itemId,
      board_id: this.boardId,
      column_values: JSON.stringify(updates)
    };

    const result = await this.makeRequest(query, variables);
    return result.change_multiple_column_values;
  }

  async getProject(itemId) {
    const query = `
      query get_item($item_id: ID!) {
        items(ids: [$item_id]) {
          id
          name
          created_at
          column_values {
            id
            title
            text
            value
          }
          assets {
            id
            name
            url
            file_size
            created_at
          }
        }
      }
    `;

    const variables = { item_id: itemId };
    const result = await this.makeRequest(query, variables);
    return result.items[0];
  }

  async testConnection() {
    try {
      const query = `
        query {
          me {
            id
            name
            email
          }
        }
      `;

      const result = await this.makeRequest(query);
      return { success: true, user: result.me };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

### **4. File Upload Handler (js/file-upload.js)**

```javascript
// File Upload Management
class FileUpload {
  constructor() {
    this.maxFileSize = 15 * 1024 * 1024; // 15MB
    this.maxFiles = 10;
    this.allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/svg+xml',
      'application/pdf'
    ];
    this.uploadedFiles = [];
    this.mondayAPI = new MondayAPI();
  }

  init() {
    this.setupDropZone();
    this.setupFileInput();
    this.loadUploadedFiles();
  }

  setupDropZone() {
    const dropZone = document.querySelector('.file-upload');
    if (!dropZone) return;

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      
      const files = Array.from(e.dataTransfer.files);
      this.handleFiles(files);
    });

    dropZone.addEventListener('click', () => {
      const fileInput = document.querySelector('#file-input');
      if (fileInput) {
        fileInput.click();
      }
    });
  }

  setupFileInput() {
    const fileInput = document.querySelector('#file-input');
    if (!fileInput) return;

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      this.handleFiles(files);
    });
  }

  async handleFiles(files) {
    // Validate file count
    if (this.uploadedFiles.length + files.length > this.maxFiles) {
      this.showError(`Maximum ${this.maxFiles} files allowed`);
      return;
    }

    // Filter valid files
    const validFiles = files.filter(file => this.validateFile(file));
    
    if (validFiles.length === 0) {
      this.showError('No valid files selected');
      return;
    }

    // Show upload progress
    this.showUploadProgress(validFiles.length);

    // Upload files
    for (const file of validFiles) {
      try {
        await this.uploadFile(file);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        this.showError(`Failed to upload ${file.name}: ${error.message}`);
      }
    }

    this.hideUploadProgress();
    this.updateFileList();
  }

  validateFile(file) {
    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      this.showError(`${file.name}: File type not supported. Please upload PNG, JPG, SVG, or PDF files.`);
      return false;
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      this.showError(`${file.name}: File size must be less than 15MB`);
      return false;
    }

    return true;
  }

  async uploadFile(file) {
    // Create local file reference
    const fileId = `file-${Date.now()}-${Math.random()}`;
    const fileData = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      url: null,
      mondayFileId: null
    };

    this.uploadedFiles.push(fileData);

    try {
      // Get Monday.com item ID from form data
      const formManager = new FormManager();
      const formData = formManager.getFormData();
      
      if (formData.mondayItemId) {
        // Upload directly to Monday.com
        const mondayFile = await this.mondayAPI.uploadFile(formData.mondayItemId, file);
        
        fileData.status = 'uploaded';
        fileData.url = mondayFile.url;
        fileData.mondayFileId = mondayFile.id;
      } else {
        // Store temporarily (will upload when project is created)
        fileData.status = 'pending';
        fileData.url = URL.createObjectURL(file);
        fileData.fileBlob = file;
      }

      // Save to form data
      formManager.setFormData({
        uploadedFiles: this.uploadedFiles
      });

      return fileData;
    } catch (error) {
      // Remove failed upload from list
      this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
      throw error;
    }
  }

  removeFile(fileId) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f.id !== fileId);
    
    // Update form data
    const formManager = new FormManager();
    formManager.setFormData({
      uploadedFiles: this.uploadedFiles
    });

    this.updateFileList();
  }

  updateFileList() {
    const fileList = document.querySelector('.uploaded-files');
    if (!fileList) return;

    if (this.uploadedFiles.length === 0) {
      fileList.innerHTML = '<p class="text-muted">No files uploaded yet</p>';
      return;
    }

    fileList.innerHTML = this.uploadedFiles.map(file => `
      <div class="file-item" data-file-id="${file.id}">
        <div class="file-info">
          <div class="file-icon">${this.getFileIcon(file.type)}</div>
          <div class="file-details">
            <div class="file-name">${file.name}</div>
            <div class="file-meta">
              ${this.formatFileSize(file.size)} • ${file.type}
              <span class="file-status status-${file.status}">${file.status}</span>
            </div>
          </div>
        </div>
        <div class="file-actions">
          ${file.url ? `<button class="btn-preview" onclick="window.open('${file.url}', '_blank')">Preview</button>` : ''}
          <button class="btn-remove" onclick="app.fileUpload.removeFile('${file.id}')">Remove</button>
        </div>
      </div>
    `).join('');
  }

  loadUploadedFiles() {
    const formManager = new FormManager();
    const formData = formManager.getFormData();
    
    if (formData.uploadedFiles) {
      this.uploadedFiles = formData.uploadedFiles;
      this.updateFileList();
    }
  }

  showUploadProgress(fileCount) {
    const progressContainer = document.querySelector('.upload-progress');
    if (progressContainer) {
      progressContainer.innerHTML = `
        <div class="progress-bar">
          <div class="progress-fill" style="width: 0%"></div>
        </div>
        <p>Uploading ${fileCount} file${fileCount > 1 ? 's' : ''}...</p>
      `;
      progressContainer.style.display = 'block';
    }
  }

  hideUploadProgress() {
    const progressContainer = document.querySelector('.upload-progress');
    if (progressContainer) {
      progressContainer.style.display = 'none';
    }
  }

  getFileIcon(type) {
    if (type.startsWith('image/')) return '🖼️';
    if (type === 'application/pdf') return '📄';
    return '📁';
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  showError(message) {
    // Reuse app's error display method
    if (window.app) {
      window.app.showError(message);
    } else {
      console.error(message);
      alert(message);
    }
  }

  async uploadPendingFiles(mondayItemId) {
    const pendingFiles = this.uploadedFiles.filter(f => f.status === 'pending' && f.fileBlob);
    
    for (const fileData of pendingFiles) {
      try {
        const mondayFile = await this.mondayAPI.uploadFile(mondayItemId, fileData.fileBlob);
        
        fileData.status = 'uploaded';
        fileData.url = mondayFile.url;
        fileData.mondayFileId = mondayFile.id;
        
        // Clean up blob URL
        if (fileData.url && fileData.url.startsWith('blob:')) {
          URL.revokeObjectURL(fileData.url);
        }
        delete fileData.fileBlob;
        
      } catch (error) {
        console.error(`Failed to upload pending file ${fileData.name}:`, error);
        fileData.status = 'failed';
      }
    }

    this.updateFileList();
    
    // Update form data
    const formManager = new FormManager();
    formManager.setFormData({
      uploadedFiles: this.uploadedFiles
    });
  }
}
```

### **5. Configuration (config/config.js)**

```javascript
// Configuration
const CONFIG = {
  // Monday.com API Configuration
  MONDAY_API_TOKEN: 'your_monday_api_token_here',
  MONDAY_BOARD_ID: 'your_board_id_here',
  
  // Application Settings
  APP_NAME: 'Good Boy Custom',
  VERSION: '1.0.0',
  
  // Form Configuration
  MAX_FILE_SIZE: 15 * 1024 * 1024, // 15MB
  MAX_FILES: 10,
  ALLOWED_FILE_TYPES: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/svg+xml',
    'application/pdf'
  ],
  
  // Product Catalog
  PRODUCT_CATEGORIES: [
    {
      id: 'polos',
      name: 'Polo Shirts',
      description: 'Classic and performance polo shirts',
      products: [
        { id: 'polo-classic', name: 'Classic Cotton Polo', price: '$45', icon: '👔' },
        { id: 'polo-performance', name: 'Performance Golf Polo', price: '$65', icon: '⛳' },
        { id: 'polo-dri-fit', name: 'Moisture-Wicking Polo', price: '$55', icon: '💧' }
      ]
    },
    {
      id: 'tshirts',
      name: 'T-Shirts',
      description: 'Comfortable cotton and performance tees',
      products: [
        { id: 'tee-cotton', name: 'Premium Cotton Tee', price: '$25', icon: '👕' },
        { id: 'tee-performance', name: 'Performance Athletic Tee', price: '$35', icon: '🏃' },
        { id: 'tee-long-sleeve', name: 'Long Sleeve Tee', price: '$30', icon: '👔' }
      ]
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      description: 'Jackets, hoodies, and weather protection',
      products: [
        { id: 'hoodie-classic', name: 'Classic Hoodie', price: '$75', icon: '🧥' },
        { id: 'jacket-windbreaker', name: 'Windbreaker Jacket', price: '$85', icon: '🌬️' },
        { id: 'vest-fleece', name: 'Fleece Vest', price: '$65', icon: '🦺' }
      ]
    },
    {
      id: 'headwear',
      name: 'Hats & Caps',
      description: 'Caps, beanies, and sun protection',
      products: [
        { id: 'cap-baseball', name: 'Classic Baseball Cap', price: '$25', icon: '🧢' },
        { id: 'hat-bucket', name: 'Bucket Hat', price: '$30', icon: '👒' },
        { id: 'beanie-knit', name: 'Knit Beanie', price: '$20', icon: '🎩' }
      ]
    }
  ],
  
  // Project Types
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
      title: 'Golf Apparel',
      description: 'Performance golf clothing for players and teams',
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
      id: 'custom-design',
      title: 'Custom Design',
      description: 'Completely custom apparel with your unique vision',
      features: ['Full creative control', 'Unique patterns', 'One-of-a-kind'],
      icon: '🎨'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Not sure? We can help you find the right solution',
      features: ['Consultation included', 'Flexible options', 'Expert guidance'],
      icon: '💡'
    }
  ],
  
  // Available Sizes
  SIZES: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  
  // Available Colors
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
  
  // Logo Placement Options
  LOGO_PLACEMENTS: [
    'Left Chest',
    'Right Chest',
    'Center Chest',
    'Back',
    'Sleeve',
    'Multiple Locations'
  ],
  
  // Form Steps
  FORM_STEPS: [
    { id: 1, name: 'Welcome', path: 'welcome.html' },
    { id: 2, name: 'Project Type', path: 'project-type.html' },
    { id: 3, name: 'Products', path: 'products.html' },
    { id: 4, name: 'Details', path: 'details.html' },
    { id: 5, name: 'Customization', path: 'customization.html' },
    { id: 6, name: 'Custom Items', path: 'custom-items.html' },
    { id: 7, name: 'Logo Upload', path: 'logo-upload.html' },
    { id: 8, name: 'Contact', path: 'contact.html' },
    { id: 9, name: 'Review', path: 'review.html' },
    { id: 10, name: 'Success', path: 'success.html' }
  ]
};

// Make config globally available
window.CONFIG = CONFIG;
```

## 🚀 Implementation Steps

### **1. Setup Project Structure**
```bash
mkdir good-boy-custom-vanilla
cd good-boy-custom-vanilla
# Create all the directories and files as outlined above
```

### **2. Configure Monday.com API**
1. Edit `config/config.js`
2. Add your Monday.com API token and board ID
3. Test the connection

### **3. Build HTML Pages**
- Start with `index.html` (homepage)
- Create each form step as a separate HTML file
- Use semantic HTML with proper form elements

### **4. Style with CSS**
- Implement the Good Boy Custom theme
- Make it responsive with CSS Grid/Flexbox
- Add smooth transitions and animations

### **5. Add JavaScript Functionality**
- Form state management with localStorage
- Monday.com API integration
- File upload with drag-and-drop
- Form validation and navigation

## 🎯 Key Benefits of HTML/CSS/JS Version

✅ **No Build Process** - Open directly in browser  
✅ **Simple Hosting** - Works on any web server  
✅ **Easy Debugging** - Browser dev tools only  
✅ **Lightweight** - Fast loading and minimal dependencies  
✅ **SEO Friendly** - Static HTML pages  
✅ **Accessible** - Standard HTML form elements  
✅ **Progressive Enhancement** - Works without JavaScript  

## 📱 Mobile-First Responsive Design

The CSS implementation uses:
- CSS Grid and Flexbox for layouts
- Mobile-first media queries
- Touch-friendly button sizes
- Responsive typography
- Optimized file upload for mobile

## 🔧 Deployment Options

### **Static Hosting:**
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any web server

### **Setup:**
1. Upload files to web server
2. Configure Monday.com API credentials
3. Test form submission
4. Add domain and SSL

This HTML/CSS/JavaScript version provides the same functionality as the Next.js version but with simpler technology that's easier to understand, modify, and deploy!

## 🎉 **Ready to Build!**

This vanilla web version will have:
- ✅ Same 10-step form flow
- ✅ Monday.com integration  
- ✅ File uploads
- ✅ Professional design
- ✅ Mobile responsive
- ✅ No framework dependencies

Perfect for developers who prefer simplicity or need maximum compatibility! 🚀