class FormManager {
  constructor() {
    this.storageKey = 'goodboy-form-data';
    this.formData = this.getDefaultFormData();
    this.loadSavedData();
  }

  getDefaultFormData() {
    return {
      // Contact information
      contactInfo: {
        email: '',
        contactName: '',
        companyName: '',
        phone: '',
        referralSource: ''
      },
      
      // Project details
      projectType: '',
      projectDescription: '',
      timeline: '',
      approximateQuantity: '',
      
      // Product selections
      selectedProducts: [],
      productDetails: {},
      
      // Customization preferences
      customization: {
        logoStyle: '',
        logoSize: '',
        budgetRange: '',
        additionalText: [],
        textDetails: '',
        specialRequirements: [],
        specialInstructions: '',
        deliveryMethod: '',
        deliveryTimeline: '',
        specificDate: ''
      },
      
      // Custom items
      customItems: [],
      
      // File uploads
      uploadedFiles: [],
      
      // Submission tracking
      status: 'draft',
      submissionId: null,
      mondayItemId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop().replace('.html', '') || 'index';
  }

  saveCurrentStep() {
    const currentPage = this.getCurrentPage();
    
    try {
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
        case 'logo-upload':
          this.saveUploadedFiles();
          break;
        case 'contact':
          this.saveContactInfo();
          break;
        case 'review':
          // Review page doesn't need saving
          break;
      }
      
      this.formData.updatedAt = new Date().toISOString();
      this.saveToLocalStorage();
    } catch (error) {
      console.error('Error saving current step:', error);
    }
  }

  saveContactInfo() {
    const email = this.getInputValue('#email') || this.getInputValue('#contact-email');
    const contactName = this.getInputValue('#contact-name');
    const companyName = this.getInputValue('#company-name');
    const phone = this.getInputValue('#phone');
    const referralSource = this.getInputValue('#referral-source');

    this.formData.contactInfo = {
      email: email || this.formData.contactInfo.email,
      contactName: contactName || this.formData.contactInfo.contactName,
      companyName: companyName || this.formData.contactInfo.companyName,
      phone: phone || this.formData.contactInfo.phone,
      referralSource: referralSource || this.formData.contactInfo.referralSource
    };
  }

  saveProjectType() {
    const selected = document.querySelector('.project-type-card.selected');
    if (selected) {
      this.formData.projectType = selected.dataset.type;
    }
    
    this.formData.projectDescription = this.getInputValue('#project-description') || this.formData.projectDescription;
    this.formData.timeline = this.getInputValue('#timeline') || this.formData.timeline;
    this.formData.approximateQuantity = this.getInputValue('#approximate-quantity') || this.formData.approximateQuantity;
  }

  saveProductSelection() {
    const selectedCards = document.querySelectorAll('.product-card.selected');
    if (selectedCards.length > 0) {
      this.formData.selectedProducts = Array.from(selectedCards).map(card => ({
        id: card.dataset.productId,
        name: card.querySelector('.product-name')?.textContent || '',
        category: card.dataset.category || '',
        categoryName: this.getCategoryName(card.dataset.category),
        price: card.querySelector('.product-price')?.textContent || '',
        icon: card.querySelector('.product-icon')?.textContent || ''
      }));
    }
  }

  saveProductDetails() {
    const products = {};
    
    this.formData.selectedProducts.forEach(product => {
      const productSection = document.querySelector(`[data-product-id="${product.id}"]`);
      if (productSection) {
        products[product.id] = {
          quantity: this.getInputValue(`.quantity-input[data-product="${product.id}"]`) || 1,
          logoPlacement: this.getInputValue(`select[data-product="${product.id}"]`) || '',
          sizes: this.getSelectedValues(productSection, '.selection-option[data-type="size"].selected'),
          colors: this.getSelectedValues(productSection, '.color-swatch[data-type="color"].selected'),
          notes: this.getInputValue(`textarea[data-product="${product.id}"]`) || ''
        };
      }
    });

    this.formData.productDetails = products;
  }

  saveCustomization() {
    const formData = new FormData(document.getElementById('customization-form'));
    const customizationData = {};
    
    // Handle form data - convert FormData to object
    for (let [key, value] of formData.entries()) {
      if (customizationData[key]) {
        // Convert to array if multiple values exist
        if (!Array.isArray(customizationData[key])) {
          customizationData[key] = [customizationData[key]];
        }
        customizationData[key].push(value);
      } else {
        customizationData[key] = value;
      }
    }

    this.formData.customization = { ...this.formData.customization, ...customizationData };
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

  saveUploadedFiles() {
    // This will be integrated with the FileUpload class
    // For now, maintain any existing uploaded files
    const existingFiles = this.formData.uploadedFiles || [];
    this.formData.uploadedFiles = existingFiles;
  }

  loadSavedData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const savedData = JSON.parse(saved);
        this.formData = { ...this.formData, ...savedData };
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }

  populateCurrentStep() {
    const currentPage = this.getCurrentPage();
    
    try {
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
    } catch (error) {
      console.error('Error populating current step:', error);
    }
  }

  populateContactInfo() {
    const { contactInfo } = this.formData;
    
    this.setInputValue('#email', contactInfo.email);
    this.setInputValue('#contact-name', contactInfo.contactName);
    this.setInputValue('#company-name', contactInfo.companyName);
    this.setInputValue('#phone', contactInfo.phone);
    this.setInputValue('#referral-source', contactInfo.referralSource);
  }

  populateProjectType() {
    if (this.formData.projectType) {
      const typeElement = document.querySelector(`[data-type="${this.formData.projectType}"]`);
      if (typeElement) {
        typeElement.classList.add('selected');
      }
    }
    
    this.setInputValue('#project-description', this.formData.projectDescription);
    this.setInputValue('#timeline', this.formData.timeline);
    this.setInputValue('#approximate-quantity', this.formData.approximateQuantity);
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
        this.setInputValue(section.querySelector('select'), details.logoPlacement);
        this.setInputValue(section.querySelector('textarea'), details.notes);
        
        // Set selected sizes
        details.sizes?.forEach(size => {
          const sizeOption = section.querySelector(`[data-type="size"][data-value="${size}"]`);
          if (sizeOption) sizeOption.classList.add('selected');
        });

        // Set selected colors
        details.colors?.forEach(color => {
          const colorOption = section.querySelector(`[data-type="color"][data-value="${color}"]`);
          if (colorOption) colorOption.classList.add('selected');
        });
      }
    });
  }

  populateCustomization() {
    const { customization } = this.formData;
    
    // Populate radio buttons
    Object.keys(customization).forEach(key => {
      const value = customization[key];
      if (typeof value === 'string' && value) {
        const radioElement = document.querySelector(`input[name="${key}"][value="${value}"]`);
        if (radioElement && radioElement.type === 'radio') {
          radioElement.checked = true;
        }
      }
    });

    // Populate checkboxes
    if (Array.isArray(customization.additionalText)) {
      customization.additionalText.forEach(value => {
        const checkbox = document.querySelector(`input[name="additional-text"][value="${value}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }

    if (Array.isArray(customization.specialRequirements)) {
      customization.specialRequirements.forEach(value => {
        const checkbox = document.querySelector(`input[name="special-requirements"][value="${value}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }

    // Populate text fields
    this.setInputValue('#text-details', customization.textDetails);
    this.setInputValue('#special-instructions', customization.specialInstructions);
    this.setInputValue('#delivery-method', customization.deliveryMethod);
    this.setInputValue('#delivery-timeline', customization.deliveryTimeline);
    this.setInputValue('#specific-date', customization.specificDate);
  }

  populateCustomItems() {
    // This would trigger the custom items page to recreate the saved items
    // Implementation depends on the custom items page structure
  }

  populateReview() {
    const reviewContainer = document.querySelector('#review-content');
    if (!reviewContainer) return;

    reviewContainer.innerHTML = this.generateReviewHTML();
  }

  generateReviewHTML() {
    const { contactInfo, projectType, selectedProducts, customItems, customization } = this.formData;
    
    return `
      <div class="review-section">
        <h3>Contact Information</h3>
        <div class="review-item">
          <p><strong>Name:</strong> ${contactInfo.contactName || 'Not provided'}</p>
          <p><strong>Email:</strong> ${contactInfo.email || 'Not provided'}</p>
          ${contactInfo.companyName ? `<p><strong>Company:</strong> ${contactInfo.companyName}</p>` : ''}
          ${contactInfo.phone ? `<p><strong>Phone:</strong> ${contactInfo.phone}</p>` : ''}
        </div>
      </div>

      <div class="review-section">
        <h3>Project Details</h3>
        <div class="review-item">
          <p><strong>Project Type:</strong> ${this.getProjectTypeName(projectType)}</p>
          ${this.formData.projectDescription ? `<p><strong>Description:</strong> ${this.formData.projectDescription}</p>` : ''}
          ${this.formData.timeline ? `<p><strong>Timeline:</strong> ${this.formData.timeline}</p>` : ''}
          ${this.formData.approximateQuantity ? `<p><strong>Quantity:</strong> ${this.formData.approximateQuantity}</p>` : ''}
        </div>
      </div>

      <div class="review-section">
        <h3>Selected Products (${selectedProducts.length})</h3>
        ${selectedProducts.map(product => `
          <div class="review-item">
            <div class="review-item-header">
              <span class="review-item-title">${product.icon} ${product.name}</span>
              <span class="review-item-price">${product.price}</span>
            </div>
            <div class="review-item-details">
              Category: ${product.categoryName || product.category}
              ${this.getProductDetailsText(product.id)}
            </div>
          </div>
        `).join('')}
      </div>

      ${customItems.length > 0 ? `
        <div class="review-section">
          <h3>Custom Items (${customItems.length})</h3>
          ${customItems.map(item => `
            <div class="review-item">
              <p><strong>Description:</strong> ${item.description}</p>
              <p><strong>Creative Freedom:</strong> ${item.creativeFreedom ? 'Yes' : 'No'}</p>
              ${item.requirements ? `<p><strong>Requirements:</strong> ${item.requirements}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="review-section">
        <h3>Customization Preferences</h3>
        <div class="review-item">
          ${customization.logoStyle ? `<p><strong>Logo Style:</strong> ${customization.logoStyle}</p>` : ''}
          ${customization.logoSize ? `<p><strong>Logo Size:</strong> ${customization.logoSize}</p>` : ''}
          ${customization.budgetRange ? `<p><strong>Budget Range:</strong> ${customization.budgetRange}</p>` : ''}
          ${customization.deliveryMethod ? `<p><strong>Delivery Method:</strong> ${customization.deliveryMethod}</p>` : ''}
          ${customization.deliveryTimeline ? `<p><strong>Timeline:</strong> ${customization.deliveryTimeline}</p>` : ''}
        </div>
      </div>
    `;
  }

  // Utility methods
  getInputValue(selector) {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    return element ? element.value : '';
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

  getCategoryName(categoryId) {
    if (!window.CONFIG || !window.CONFIG.PRODUCT_CATEGORIES) return categoryId;
    
    const category = window.CONFIG.PRODUCT_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  }

  getProjectTypeName(projectTypeId) {
    if (!window.CONFIG || !window.CONFIG.PROJECT_TYPES) return projectTypeId;
    
    const projectType = window.CONFIG.PROJECT_TYPES.find(type => type.id === projectTypeId);
    return projectType ? projectType.title : projectTypeId;
  }

  getProductDetailsText(productId) {
    const details = this.formData.productDetails[productId];
    if (!details) return '';
    
    let text = '';
    
    // Show size quantities if available
    if (details.sizeQuantities) {
      const sizeQtyText = Object.entries(details.sizeQuantities)
        .map(([size, qty]) => `${size}: ${qty}`)
        .join(', ');
      text += ` • Sizes: ${sizeQtyText}`;
    } else if (details.sizes && details.sizes.length) {
      text += ` • Sizes: ${details.sizes.join(', ')}`;
    }
    
    // Show total quantity
    if (details.totalQuantity) text += ` • Total Qty: ${details.totalQuantity}`;
    else if (details.quantity) text += ` • Qty: ${details.quantity}`;
    
    if (details.colors && details.colors.length) text += ` • Colors: ${details.colors.join(', ')}`;
    if (details.logoPlacement) text += ` • Logo: ${details.logoPlacement}`;
    
    return text;
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
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
    const total = 8;

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

  // Validation methods
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
    const { contactInfo } = this.formData;
    
    if (!contactInfo.email || !contactInfo.contactName) {
      return { isValid: false, message: 'Please fill in all required fields' };
    }

    if (!this.isValidEmail(contactInfo.email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true };
  }

  validateProjectType() {
    if (!this.formData.projectType) {
      return { isValid: false, message: 'Please select a project type' };
    }
    return { isValid: true };
  }

  validateProductSelection() {
    if (this.formData.selectedProducts.length === 0) {
      return { isValid: false, message: 'Please select at least one product' };
    }
    return { isValid: true };
  }

  validateProductDetails() {
    const errors = [];
    
    this.formData.selectedProducts.forEach(product => {
      const details = this.formData.productDetails[product.id];
      if (!details) {
        errors.push(`Missing details for ${product.name}`);
        return;
      }
      
      if (!details.sizes || details.sizes.length === 0) {
        errors.push(`Please select sizes for ${product.name}`);
      }
      
      if (!details.colors || details.colors.length === 0) {
        errors.push(`Please select colors for ${product.name}`);
      }
      
      if (!details.quantity || details.quantity < 1) {
        errors.push(`Please specify quantity for ${product.name}`);
      }
    });
    
    if (errors.length > 0) {
      return { isValid: false, message: errors.join('\n') };
    }
    
    return { isValid: true };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Make available globally
window.FormManager = FormManager;