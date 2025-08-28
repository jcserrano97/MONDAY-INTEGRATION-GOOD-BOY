class GoodBoyCustomApp {
  constructor() {
    this.formManager = null;
    this.mondayAPI = null;
    this.fileUpload = null;
    this.autoSaveTimeout = null;
    
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupEventListeners();
    
    // Initialize form manager for form pages
    if (this.isFormPage()) {
      this.initializeFormManager();
    }
    
    // Initialize current page specific functionality
    const currentPage = this.getCurrentPage();
    this.initializePage(currentPage);
  }

  isFormPage() {
    return window.location.pathname.includes('/form/');
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    return filename || 'index';
  }

  initializeFormManager() {
    if (window.FormManager) {
      this.formManager = new FormManager();
    }
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
    
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
          const isVisible = navMenu.style.display === 'flex';
          navMenu.style.display = isVisible ? 'none' : 'flex';
          
          // Add mobile menu styling
          if (!isVisible) {
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'var(--bg-primary)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = 'var(--shadow-lg)';
            navMenu.style.borderTop = '1px solid var(--border-color)';
            navMenu.style.zIndex = '1000';
          }
        }
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navMenu = document.querySelector('.nav-menu');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (navMenu && mobileToggle && 
          !navMenu.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
        navMenu.style.borderTop = '';
        navMenu.style.zIndex = '';
      }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupEventListeners() {
    // Auto-save form data for form pages
    if (this.isFormPage()) {
      document.addEventListener('input', (e) => {
        if (e.target.matches('input, textarea, select')) {
          this.autoSaveFormData();
        }
      });

      // Handle page visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && this.formManager) {
          this.formManager.saveCurrentStep();
        }
      });

      // Handle beforeunload
      window.addEventListener('beforeunload', () => {
        if (this.formManager) {
          this.formManager.saveCurrentStep();
        }
      });
    }

    // Handle form submissions with loading states
    document.addEventListener('submit', (e) => {
      const submitButton = e.target.querySelector('button[type="submit"]');
      if (submitButton && !e.defaultPrevented) {
        this.setLoadingState(submitButton, true);
      }
    });
  }

  // Page initialization methods
  initWelcomePage() {
    this.updateProgressBar(1, 10);
    this.loadSavedContactInfo();
  }

  initProjectTypePage() {
    this.updateProgressBar(2, 10);
    this.loadSavedProjectType();
  }

  initProductsPage() {
    this.updateProgressBar(3, 10);
    this.loadSavedProducts();
  }

  initDetailsPage() {
    this.updateProgressBar(4, 10);
    this.loadSavedDetails();
  }

  initCustomizationPage() {
    this.updateProgressBar(5, 10);
    this.loadSavedCustomization();
  }

  initCustomItemsPage() {
    this.updateProgressBar(6, 10);
    this.loadSavedCustomItems();
  }

  initLogoUploadPage() {
    this.updateProgressBar(7, 10);
    if (window.FileUpload) {
      this.fileUpload = new FileUpload();
      this.fileUpload.init();
    }
  }

  initContactPage() {
    this.updateProgressBar(8, 10);
    this.loadSavedContactInfo();
  }

  initReviewPage() {
    this.updateProgressBar(9, 10);
    this.loadOrderReview();
  }

  initSuccessPage() {
    this.updateProgressBar(10, 10);
    this.displaySuccessMessage();
  }

  initHomePage() {
    // Homepage specific initialization
    this.setupHeroAnimations();
    this.setupFeatureCards();
  }

  // Navigation methods
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

  // UI utility methods
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

    this.updateStepIndicators(currentStep);
  }

  updateStepIndicators(currentStep) {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      
      step.classList.remove('active', 'completed');
      
      if (stepNumber < currentStep) {
        step.classList.add('completed');
      } else if (stepNumber === currentStep) {
        step.classList.add('active');
      }
    });
  }

  setLoadingState(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = `
        <span class="spinner"></span>
        Loading...
      `;
    } else {
      button.disabled = false;
      if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        delete button.dataset.originalText;
      }
    }
  }

  showAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
      <span>${this.getAlertIcon(type)}</span>
      <span>${message}</span>
      <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add some basic styling for the close button
    const style = document.createElement('style');
    style.textContent = `
      .alert-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        padding: 0 0.25rem;
        margin-left: auto;
      }
      .alert-close:hover {
        opacity: 1;
      }
      .alert {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    `;
    
    if (!document.querySelector('#alert-styles')) {
      style.id = 'alert-styles';
      document.head.appendChild(style);
    }
    
    const form = document.querySelector('.form-step') || document.querySelector('main');
    if (form) {
      form.insertBefore(alert, form.firstChild);
      
      // Auto-hide after 5 seconds for non-error messages
      if (type !== 'error') {
        setTimeout(() => {
          if (alert.parentNode) {
            alert.remove();
          }
        }, 5000);
      }
    }
  }

  getAlertIcon(type) {
    const icons = {
      success: '✅',
      error: '⚠️',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  // Data management methods
  autoSaveFormData() {
    clearTimeout(this.autoSaveTimeout);
    this.autoSaveTimeout = setTimeout(() => {
      if (this.formManager) {
        this.formManager.saveCurrentStep();
      }
    }, 1000);
  }

  // Load saved data methods (these will integrate with FormManager)
  loadSavedContactInfo() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadSavedProjectType() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadSavedProducts() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadSavedDetails() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadSavedCustomization() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadSavedCustomItems() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  loadOrderReview() {
    if (this.formManager) {
      this.formManager.populateCurrentStep();
    }
  }

  displaySuccessMessage() {
    // Display success confirmation
    const savedData = this.getFormData();
    if (savedData && savedData.submissionId) {
      console.log('Order submitted successfully:', savedData.submissionId);
    }
  }

  // Homepage specific methods
  setupHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100);
      }, index * 200);
    });
  }

  setupFeatureCards() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });
  }

  // Data access methods
  getFormData() {
    try {
      return JSON.parse(localStorage.getItem('goodboy-form-data')) || {};
    } catch (e) {
      console.error('Error loading form data:', e);
      return {};
    }
  }

  setFormData(data) {
    try {
      const existingData = this.getFormData();
      const updatedData = { ...existingData, ...data };
      localStorage.setItem('goodboy-form-data', JSON.stringify(updatedData));
    } catch (e) {
      console.error('Error saving form data:', e);
    }
  }

  clearFormData() {
    localStorage.removeItem('goodboy-form-data');
  }

  // Validation methods
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  validateRequired(value) {
    return value && value.trim().length > 0;
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new GoodBoyCustomApp();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoodBoyCustomApp;
}