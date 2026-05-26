import { useState, useRef, useEffect } from 'react';
import './NutritionAI.css';

const NutritionAI = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hi! I\'m your NutriWell AI Assistant. I can help you with nutrition advice, meal planning, macro calculations, and health questions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Responses Database
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Nutrition advice
    if (message.includes('calorie') || message.includes('calories')) {
      return 'A typical adult needs 2000-2500 calories per day, but this varies based on age, gender, activity level, and goals. For weight loss, aim for 300-500 calories below maintenance. For muscle gain, aim for 300-500 calories above maintenance.';
    }

    if (message.includes('protein')) {
      return 'Protein is essential for muscle growth and repair. Aim for 0.8-1g per pound of body weight if you\'re training. Good sources include chicken, fish, eggs, Greek yogurt, tofu, and legumes.';
    }

    if (message.includes('carb')) {
      return 'Carbs are your body\'s primary energy source. Focus on complex carbs like oats, brown rice, sweet potatoes, and whole wheat bread. Aim for 2-3g per pound of body weight depending on activity level.';
    }

    if (message.includes('fat')) {
      return 'Healthy fats are crucial for hormone production and nutrient absorption. Aim for 0.3-0.5g per pound of body weight. Good sources: avocados, nuts, olive oil, fatty fish, and seeds.';
    }

    if (message.includes('weight loss') || message.includes('lose weight')) {
      return 'To lose weight: 1) Create a calorie deficit (300-500 below maintenance), 2) Eat high protein (0.8-1g per lb), 3) Stay hydrated, 4) Exercise regularly, 5) Get enough sleep. Aim for 1-2 lbs per week.';
    }

    if (message.includes('muscle') || message.includes('gain')) {
      return 'To build muscle: 1) Eat in a calorie surplus (300-500 above maintenance), 2) Consume 0.8-1g protein per lb, 3) Lift weights 3-5x per week, 4) Get 7-9 hours sleep, 5) Stay consistent for 8-12 weeks.';
    }

    if (message.includes('meal') || message.includes('eat')) {
      return 'A balanced meal should include: protein (chicken, fish, tofu), carbs (rice, potatoes, bread), vegetables (broccoli, spinach, peppers), and healthy fats (olive oil, avocado). Example: Grilled chicken + brown rice + broccoli + olive oil.';
    }

    if (message.includes('water') || message.includes('hydration')) {
      return 'Aim for 8-10 glasses of water daily (about 2-3 liters). Drink more if you exercise or live in a hot climate. Proper hydration improves metabolism, energy, and recovery.';
    }

    if (message.includes('macro') || message.includes('macros')) {
      return 'Macros are: Protein (4 cal/g), Carbs (4 cal/g), Fats (9 cal/g). A common split is 40% protein, 40% carbs, 20% fats. Adjust based on your goals and preferences.';
    }

    if (message.includes('snack')) {
      return 'Healthy snacks: Greek yogurt, almonds, protein bars, fruit, peanut butter, cheese, hard-boiled eggs, or a protein shake. Aim for 150-200 calories with good protein content.';
    }

    if (message.includes('breakfast')) {
      return 'Great breakfast options: Oatmeal with berries and protein powder, eggs with toast, Greek yogurt with granola, or a protein smoothie. Include protein and complex carbs for sustained energy.';
    }

    if (message.includes('dinner')) {
      return 'Healthy dinner: Grilled protein (chicken, fish, tofu) + complex carbs (rice, pasta, potatoes) + vegetables (broccoli, spinach, peppers) + healthy fat (olive oil). Aim for 500-700 calories.';
    }

    if (message.includes('supplement') || message.includes('vitamin')) {
      return 'Popular supplements: Protein powder, creatine, multivitamin, omega-3, vitamin D. Consult a doctor before starting. Focus on whole foods first, supplements are secondary.';
    }

    if (message.includes('exercise') || message.includes('workout')) {
      return 'A balanced routine: 3-5 days strength training, 2-3 days cardio, 1-2 rest days. Combine compound movements (squats, deadlifts, bench press) with isolation exercises.';
    }

    if (message.includes('sleep')) {
      return 'Sleep is crucial for recovery and metabolism. Aim for 7-9 hours per night. Poor sleep increases hunger hormones and decreases metabolism. Maintain a consistent sleep schedule.';
    }

    if (message.includes('stress')) {
      return 'Stress increases cortisol, which can lead to weight gain. Manage stress through: meditation, exercise, sleep, hobbies, and social connections. This supports your nutrition goals.';
    }

    if (message.includes('hello') || message.includes('hi')) {
      return 'Hello! How can I help you with your nutrition and wellness goals today?';
    }

    if (message.includes('thank')) {
      return 'You\'re welcome! Feel free to ask me anything about nutrition, fitness, or wellness. I\'m here to help! 💪';
    }

    // Default response
    return 'That\'s a great question! I can help with nutrition advice, meal planning, macro calculations, weight loss/gain strategies, and general health tips. What specific area would you like to focus on?';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="ai-modal-overlay" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ai-header">
          <h2>🤖 NutriWell AI Assistant</h2>
          <button className="ai-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="ai-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message ${msg.type}`}>
              <div className="ai-message-icon">
                {msg.type === 'bot' ? '🤖' : '👤'}
              </div>
              <div className="ai-message-content">
                <p>{msg.text}</p>
                <span className="ai-message-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="ai-message bot">
              <div className="ai-message-icon">🤖</div>
              <div className="ai-message-content">
                <div className="ai-typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="ai-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask me about nutrition, fitness, or wellness..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="ai-input"
          />
          <button type="submit" disabled={loading || !input.trim()} className="ai-send-btn">
            {loading ? '...' : '➤'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NutritionAI;
