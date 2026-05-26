import { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 0,
      type: 'bot', 
      text: 'Hi! I\'m your NutriWell AI Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined FAQ options with better organization
  const predefinedOptions = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I track my daily calories?',
      answer: 'To track your daily calories:\n1. Go to the Dashboard\n2. Click "Log Food" button\n3. Enter your food name and nutritional info\n4. Click submit to see your progress bars update in real-time!'
    },
    {
      id: 2,
      category: 'Plans & Services',
      question: 'What nutrition plans do you offer?',
      answer: 'We offer personalized nutrition plans including:\n• Weight Loss Plans\n• Muscle Gain Plans\n• Balanced Diet Plans\n• Keto & Low-Carb Plans\n• Vegan & Vegetarian Plans\n\nVisit our Services page to learn more!'
    },
    {
      id: 3,
      category: 'Settings',
      question: 'How do I set my macro goals?',
      answer: 'Currently, default goals are set to:\n• Calories: 2,000 kcal\n• Protein: 150g\n• Carbs: 200g\n• Fats: 65g\n\nCustom goal settings will be available in the next update!'
    },
    {
      id: 4,
      category: 'Data & Export',
      question: 'Can I export my nutrition data?',
      answer: 'Yes! You can export your data:\n1. Go to Dashboard\n2. Click on "Export Data" button\n3. Choose format (CSV or PDF)\n4. Download your complete nutrition history'
    },
    {
      id: 5,
      category: 'Support',
      question: 'How do I contact support?',
      answer: 'You can reach our support team:\n• Email: nutriwelldiet@gmail.com\n• Phone: +1 (555) 123-4567\n• Contact Form: Visit our Contact page\n• Live Chat: Available Mon-Fri 9AM-5PM EST'
    },
    {
      id: 6,
      category: 'Benefits',
      question: 'What are the benefits of meal planning?',
      answer: 'Meal planning helps you:\n✓ Save time and reduce stress\n✓ Eat healthier and reach your goals\n✓ Reduce food waste\n✓ Save money on groceries\n✓ Stay consistent with your nutrition\n\nCheck out our Meal Planning service!'
    }
  ];

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (option) => {
    setIsLoading(true);
    setShowOptions(false);

    // Add user message immediately
    const userMessage = {
      id: messages.length,
      type: 'user',
      text: option.question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot thinking time for better UX
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 1,
        type: 'bot',
        text: option.answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Show options again after a delay
      setTimeout(() => {
        setShowOptions(true);
      }, 1500);
    }, 800);
  };

  const handleReset = () => {
    setMessages([
      { 
        id: 0,
        type: 'bot', 
        text: 'Hi! I\'m your NutriWell AI Assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    setShowOptions(true);
    setIsLoading(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`ai-assistant-button ${isOpen ? 'hidden' : ''}`}
        onClick={toggleChat}
        aria-label="Open AI Assistant"
        title="Open AI Assistant"
      >
        <span className="ai-icon" aria-hidden="true">🤖</span>
        <span className="ai-text">Need Help?</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-assistant-chat" role="dialog" aria-label="AI Assistant Chat">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-content">
              <span className="chat-icon" aria-hidden="true">🤖</span>
              <div className="chat-header-text">
                <h3>NutriWell Assistant</h3>
                <p className="chat-status">
                  <span className="status-dot"></span>
                  Online
                </p>
              </div>
            </div>
            <button 
              className="close-btn" 
              onClick={toggleChat}
              aria-label="Close chat"
              title="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
                role={message.type === 'user' ? 'article' : 'status'}
              >
                {message.type === 'bot' && (
                  <span className="message-icon" aria-hidden="true">🤖</span>
                )}
                <div className="message-bubble">
                  {message.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="message bot">
                <span className="message-icon" aria-hidden="true">🤖</span>
                <div className="message-bubble loading">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            {showOptions && !isLoading && (
              <div className="options-container">
                <p className="options-title">Choose a topic:</p>
                <div className="options-grid">
                  {predefinedOptions.map((option) => (
                    <button
                      key={option.id}
                      className="option-button"
                      onClick={() => handleOptionClick(option)}
                      aria-label={`Ask about: ${option.question}`}
                    >
                      <span className="option-text">{option.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <button 
              className="reset-btn" 
              onClick={handleReset}
              aria-label="Start a new conversation"
            >
              <span aria-hidden="true">🔄</span>
              Start Over
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
