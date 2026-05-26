// Get API URL from environment, with fallback for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

class APIService {
  constructor() {
    this.userId = localStorage.getItem('userId');
    this.sessionId = localStorage.getItem('sessionId');
  }

  // Set user ID
  setUserId(userId) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
  }

  // Set session ID
  setSessionId(sessionId) {
    this.sessionId = sessionId;
    localStorage.setItem('sessionId', sessionId);
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Build headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(options.headers || {})
    };

    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Build config - don't spread options to avoid overwriting headers
    const config = {
      method: options.method || 'GET',
      headers,
      ...(options.body && { body: options.body })
    };

    console.log('📡 API Request:', {
      url,
      method: config.method,
      headers: config.headers,
      hasBody: !!config.body
    });

    try {
      const response = await fetch(url, config);
      
      console.log('📥 API Response:', {
        url,
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type')
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn('⚠️ Response is not JSON:', text);
        data = { error: 'Invalid response format' };
      }

      if (!response.ok) {
        console.error('❌ API Error Response:', data);
        throw new Error(data.error || `API request failed with status ${response.status}`);
      }

      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('❌ API Error:', {
        url,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // ==================== AUTH ENDPOINTS ====================

  async register(email, password, name) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });

    this.setUserId(data.userId);
    this.setSessionId(data.sessionId);
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    this.setUserId(data.userId);
    this.setSessionId(data.sessionId);
    return data;
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  // ==================== FOOD LOG ENDPOINTS ====================

  async createFoodLog(foodName, calories, protein, carbs, fats) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not authenticated');
    }

    console.log('🍽️ Creating food log for userId:', userId);
    console.log('📤 Request payload:', { userId, foodName, calories, protein, carbs, fats });

    try {
      const data = await this.request('/logs', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          foodName,
          calories,
          protein,
          carbs,
          fats
        })
      });

      console.log('✅ Food log created successfully:', data);

      // Track event
      this.trackEvent('FOOD_LOGGED', {
        foodName,
        calories,
        protein,
        carbs,
        fats
      });

      return data;
    } catch (error) {
      console.error('❌ Error creating food log:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  async getDailyLogs(date = null) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const queryParams = date ? `?date=${date}` : '';
    return this.request(`/logs/${userId}${queryParams}`);
  }

  // ==================== ANALYTICS ENDPOINTS ====================

  async getUserAnalytics() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not authenticated');
    }

    return this.request(`/analytics/user/${userId}`);
  }

  async getGlobalAnalytics() {
    return this.request('/analytics/global');
  }

  // ==================== CONTACT FORM ====================

  async submitContact(contactData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData)
    });
  }

  // ==================== EVENT TRACKING ====================

  async trackEvent(eventType, eventData = {}) {
    if (!this.userId) {
      return; // Silently fail if user not authenticated
    }

    try {
      await this.request('/events/track', {
        method: 'POST',
        body: JSON.stringify({
          userId: this.userId,
          eventType,
          eventData
        })
      });
    } catch (error) {
      console.warn('Failed to track event:', error);
    }
  }

  // Track page view
  trackPageView(pageName) {
    this.trackEvent('PAGE_VIEW', { pageName });
  }

  // Track button click
  trackButtonClick(buttonName) {
    this.trackEvent('BUTTON_CLICK', { buttonName });
  }

  // Track form submission
  trackFormSubmit(formName) {
    this.trackEvent('FORM_SUBMIT', { formName });
  }

  // Track time spent
  trackTimeSpent(pageName, timeInSeconds) {
    this.trackEvent('TIME_SPENT', { pageName, timeInSeconds });
  }
}

export default new APIService();
