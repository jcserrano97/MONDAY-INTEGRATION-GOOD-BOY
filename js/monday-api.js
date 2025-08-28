class MondayAPI {
  constructor() {
    this.apiToken = CONFIG.MONDAY_API_TOKEN;
    this.boardId = CONFIG.MONDAY_BOARD_ID;
    this.apiUrl = 'https://api.monday.com/v2';
  }

  async makeRequest(query, variables = {}) {
    try {
      console.log('Making Monday.com API request:', { query, variables });
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': this.apiToken,
          'Content-Type': 'application/json',
          'API-Version': '2023-10'
        },
        body: JSON.stringify({
          query,
          variables
        })
      });

      console.log('Monday.com API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Monday.com API error response:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Monday.com API result:', result);
      
      if (result.errors) {
        console.error('Monday.com API errors:', result.errors);
        throw new Error(`Monday.com API Error: ${result.errors[0].message}`);
      }

      return result.data;
    } catch (error) {
      console.error('Monday.com API request failed:', error);
      throw error;
    }
  }

  async createProject(formData) {
    const { contactInfo, projectType, selectedProducts, customItems } = formData;
    const timestamp = new Date().toISOString().slice(0, 10);
    const customerName = contactInfo?.contactName || 'Quote Request';
    const projectTypeName = this.getProjectTypeName(projectType?.title || projectType?.id || projectType);
    const projectName = `${customerName} - ${projectTypeName} (${timestamp})`;
    
    console.log('Creating Monday.com project with name:', projectName);
    
    // Create item with just name first - no column values to avoid column mismatch
    const query = `
      mutation create_item($board_id: ID!, $item_name: String!) {
        create_item(
          board_id: $board_id,
          item_name: $item_name
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
      item_name: projectName
    };

    try {
      const result = await this.makeRequest(query, variables);
      return result.create_item;
    } catch (error) {
      console.error('Failed to create Monday.com project:', error);
      throw error;
    }
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

    try {
      const result = await this.makeRequest(query, variables);
      return result.change_multiple_column_values;
    } catch (error) {
      console.error('Failed to update Monday.com project:', error);
      throw error;
    }
  }

  async addDetailedUpdate(itemId, formData) {
    const { contactInfo, selectedProducts, customItems, productDetails, customization } = formData;
    
    // Create a detailed update with all form information
    const updateBody = this.formatDetailedUpdate(formData);
    
    const query = `
      mutation create_update($item_id: ID!, $body: String!) {
        create_update(item_id: $item_id, body: $body) {
          id
          body
          created_at
        }
      }
    `;

    const variables = {
      item_id: itemId,
      body: updateBody
    };

    try {
      const result = await this.makeRequest(query, variables);
      return result.create_update;
    } catch (error) {
      console.error('Failed to add detailed update:', error);
      throw error;
    }
  }

  formatDetailedUpdate(formData) {
    const { 
      contactInfo, 
      projectType, 
      selectedProducts, 
      customItems, 
      productDetails, 
      customization,
      projectDescription,
      timeline,
      approximateQuantity,
      stylePreference 
    } = formData;

    let updateText = `📝 **New Custom Apparel Request**\n\n`;
    
    // Contact Information
    if (contactInfo) {
      updateText += `👤 **Contact Details:**\n`;
      if (contactInfo.contactName) updateText += `• Name: ${contactInfo.contactName}\n`;
      if (contactInfo.email) updateText += `• Email: ${contactInfo.email}\n`;
      if (contactInfo.companyName) updateText += `• Company: ${contactInfo.companyName}\n`;
      if (contactInfo.phone) updateText += `• Phone: ${contactInfo.phone}\n`;
      updateText += `\n`;
    }

    // Project Information
    updateText += `🎯 **Project Information:**\n`;
    updateText += `• Type: ${this.getProjectTypeName(projectType)}\n`;
    if (projectDescription) updateText += `• Description: ${projectDescription}\n`;
    if (timeline) updateText += `• Timeline: ${timeline}\n`;
    if (approximateQuantity) updateText += `• Quantity: ${approximateQuantity}\n`;
    updateText += `\n`;

    // Selected Products
    if (selectedProducts.length > 0) {
      updateText += `👕 **Selected Products (${selectedProducts.length}):**\n`;
      selectedProducts.forEach(product => {
        updateText += `• ${product.name} (${product.price})\n`;
        const details = productDetails[product.id];
        if (details) {
          if (details.quantity) updateText += `  - Quantity: ${details.quantity}\n`;
          if (details.sizes?.length) updateText += `  - Sizes: ${details.sizes.join(', ')}\n`;
          if (details.colors?.length) updateText += `  - Colors: ${details.colors.join(', ')}\n`;
          if (details.logoPlacement) updateText += `  - Logo Placement: ${details.logoPlacement}\n`;
          if (details.notes) updateText += `  - Notes: ${details.notes}\n`;
        }
      });
      updateText += `\n`;
    }

    // Custom Items
    if (customItems.length > 0) {
      updateText += `🎨 **Custom Items (${customItems.length}):**\n`;
      customItems.forEach((item, index) => {
        updateText += `${index + 1}. ${item.description}\n`;
        if (item.creativeFreedom) updateText += `   - Creative freedom: Yes\n`;
        if (item.requirements) updateText += `   - Requirements: ${item.requirements}\n`;
      });
      updateText += `\n`;
    }

    // Customization Preferences
    if (customization && Object.keys(customization).length > 0) {
      updateText += `⚙️ **Customization Preferences:**\n`;
      if (customization['logo-style']) updateText += `• Logo Style: ${customization['logo-style']}\n`;
      if (customization['logo-size']) updateText += `• Logo Size: ${customization['logo-size']}\n`;
      if (customization['budget-range']) updateText += `• Budget Range: ${customization['budget-range']}\n`;
      if (customization['delivery-method']) updateText += `• Delivery Method: ${customization['delivery-method']}\n`;
      if (customization['delivery-timeline']) updateText += `• Timeline: ${customization['delivery-timeline']}\n`;
      if (customization['special-instructions']) updateText += `• Special Instructions: ${customization['special-instructions']}\n`;
      updateText += `\n`;
    }

    updateText += `📅 **Submitted:** ${new Date().toLocaleString()}\n`;
    updateText += `🔗 **Generated by:** Good Boy Custom Order Form`;

    return updateText;
  }

  getProjectTypeName(projectTypeId) {
    if (!window.CONFIG?.PROJECT_TYPES) return projectTypeId;
    const projectType = window.CONFIG.PROJECT_TYPES.find(type => type.id === projectTypeId);
    return projectType ? projectType.title : projectTypeId;
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
          updates {
            id
            body
            created_at
          }
        }
      }
    `;

    const variables = { item_id: itemId };
    
    try {
      const result = await this.makeRequest(query, variables);
      return result.items[0];
    } catch (error) {
      console.error('Failed to get Monday.com project:', error);
      throw error;
    }
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

  // Utility method to submit complete order to Monday.com
  async submitOrder(formData) {
    try {
      // Step 1: Create the main project item
      const project = await this.createProject(formData);
      const itemId = project.id;

      // Step 2: Add detailed update with all form information
      await this.addDetailedUpdate(itemId, formData);

      // Step 3: Upload files if any exist
      if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
        const fileUploadPromises = formData.uploadedFiles.map(fileData => {
          // Note: This would require the actual File objects, not just metadata
          // In a real implementation, you'd need to store the File objects temporarily
          // or handle file uploads differently
          return this.uploadFile(itemId, fileData.file);
        });

        try {
          await Promise.all(fileUploadPromises);
        } catch (fileError) {
          console.warn('Some file uploads failed:', fileError);
          // Continue with submission even if file uploads fail
        }
      }

      return {
        success: true,
        projectId: itemId,
        projectUrl: project.url,
        projectName: project.name
      };

    } catch (error) {
      console.error('Failed to submit order to Monday.com:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Make available globally
window.MondayAPI = MondayAPI;