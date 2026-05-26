import { useState } from 'react';
import './Games.css';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div className="games-container">
      <div className="games-header">
        <h2>🎮 Nutrition Games</h2>
        <p>Learn about nutrition while having fun!</p>
      </div>

      {!activeGame ? (
        <div className="games-menu">
          <div className="game-card" onClick={() => setActiveGame('quiz')}>
            <div className="game-icon">📝</div>
            <h3>Nutrition Quiz</h3>
            <p>Test your nutrition knowledge with fun questions</p>
            <button className="play-btn">Play Now</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('matching')}>
            <div className="game-icon">🎯</div>
            <h3>Food Matching</h3>
            <p>Match foods with their nutritional values</p>
            <button className="play-btn">Play Now</button>
          </div>

          <div className="game-card" onClick={() => setActiveGame('choices')}>
            <div className="game-icon">✅</div>
            <h3>Healthy Choices</h3>
            <p>Choose between healthy and unhealthy options</p>
            <button className="play-btn">Play Now</button>
          </div>
        </div>
      ) : (
        <button className="back-btn" onClick={() => setActiveGame(null)}>← Back to Games</button>
      )}

      {activeGame === 'quiz' && <NutritionQuiz />}
      {activeGame === 'matching' && <FoodMatching />}
      {activeGame === 'choices' && <HealthyChoices />}
    </div>
  );
};

// Nutrition Quiz Game
const NutritionQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "How many calories are in 1 gram of protein?",
      options: ["2 calories", "4 calories", "7 calories", "9 calories"],
      correct: 1
    },
    {
      question: "Which food is highest in fiber?",
      options: ["White bread", "Broccoli", "Chicken", "Milk"],
      correct: 1
    },
    {
      question: "What is the recommended daily water intake?",
      options: ["2 liters", "4 liters", "8 glasses", "1 liter"],
      correct: 2
    },
    {
      question: "Which vitamin is found in oranges?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      correct: 2
    },
    {
      question: "How many calories are in 1 gram of carbohydrates?",
      options: ["2 calories", "4 calories", "7 calories", "9 calories"],
      correct: 1
    },
    {
      question: "Which is a healthy fat source?",
      options: ["Butter", "Avocado", "Lard", "Margarine"],
      correct: 1
    },
    {
      question: "What is the main function of protein?",
      options: ["Energy", "Muscle building", "Digestion", "Sleep"],
      correct: 1
    },
    {
      question: "Which food has the most potassium?",
      options: ["Apple", "Banana", "Orange", "Grape"],
      correct: 1
    }
  ];

  const handleAnswerClick = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="game-content">
      {showScore ? (
        <div className="score-display">
          <h3>Quiz Complete! 🎉</h3>
          <p className="final-score">Your Score: {score} / {questions.length}</p>
          <p className="score-message">
            {score === questions.length && "Perfect! You're a nutrition expert! 🌟"}
            {score >= questions.length * 0.7 && score < questions.length && "Great job! You know your nutrition! 👏"}
            {score < questions.length * 0.7 && "Good effort! Keep learning about nutrition! 📚"}
          </p>
          <button className="restart-btn" onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div className="quiz-game">
          <div className="quiz-header">
            <span className="question-counter">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="progress-dots">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index <= currentQuestion ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <h3 className="question">{questions[currentQuestion].question}</h3>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Food Matching Game
const FoodMatching = () => {
  const [cards, setCards] = useState(() => {
    const pairs = [
      { id: 1, type: 'food', value: 'Apple', pair: 1 },
      { id: 2, type: 'nutrition', value: 'Vitamin C', pair: 1 },
      { id: 3, type: 'food', value: 'Salmon', pair: 2 },
      { id: 4, type: 'nutrition', value: 'Omega-3', pair: 2 },
      { id: 5, type: 'food', value: 'Spinach', pair: 3 },
      { id: 6, type: 'nutrition', value: 'Iron', pair: 3 },
      { id: 7, type: 'food', value: 'Banana', pair: 4 },
      { id: 8, type: 'nutrition', value: 'Potassium', pair: 4 },
      { id: 9, type: 'food', value: 'Almonds', pair: 5 },
      { id: 10, type: 'nutrition', value: 'Protein', pair: 5 },
      { id: 11, type: 'food', value: 'Broccoli', pair: 6 },
      { id: 12, type: 'nutrition', value: 'Calcium', pair: 6 }
    ];
    return pairs.sort(() => Math.random() - 0.5);
  });

  const [flipped, setFlipped] = useState({});
  const [matched, setMatched] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardClick = (id) => {
    if (matched.includes(id) || flipped[id] || selectedCards.includes(id)) return;

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);
    setFlipped({ ...flipped, [id]: true });

    if (newSelected.length === 2) {
      const card1 = cards.find(c => c.id === newSelected[0]);
      const card2 = cards.find(c => c.id === newSelected[1]);

      if (card1.pair === card2.pair) {
        setMatched([...matched, newSelected[0], newSelected[1]]);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setFlipped(prev => {
            const newFlipped = { ...prev };
            delete newFlipped[newSelected[0]];
            delete newFlipped[newSelected[1]];
            return newFlipped;
          });
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const isGameComplete = matched.length === cards.length;

  return (
    <div className="game-content">
      {isGameComplete ? (
        <div className="score-display">
          <h3>You Won! 🎉</h3>
          <p className="final-score">All pairs matched!</p>
          <button className="restart-btn" onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div className="matching-game">
          <div className="matching-header">
            <p>Matched: {matched.length / 2} / {cards.length / 2}</p>
          </div>
          <div className="cards-grid">
            {cards.map(card => (
              <div
                key={card.id}
                className={`card ${flipped[card.id] ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-inner">
                  <div className="card-front">?</div>
                  <div className="card-back">{card.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Healthy Choices Game
const HealthyChoices = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      scenario: "You're hungry for a snack. Choose:",
      healthy: "Apple with almond butter",
      unhealthy: "Chips and soda"
    },
    {
      scenario: "For breakfast, which is better?",
      healthy: "Oatmeal with berries",
      unhealthy: "Sugary cereal with milk"
    },
    {
      scenario: "Lunch time! Pick one:",
      healthy: "Grilled chicken salad",
      unhealthy: "Fried chicken burger"
    },
    {
      scenario: "Feeling thirsty?",
      healthy: "Water or green tea",
      unhealthy: "Energy drink"
    },
    {
      scenario: "Dinner choice:",
      healthy: "Baked salmon with vegetables",
      unhealthy: "Pizza with extra cheese"
    },
    {
      scenario: "Sweet craving?",
      healthy: "Greek yogurt with honey",
      unhealthy: "Chocolate cake"
    },
    {
      scenario: "Post-workout meal:",
      healthy: "Protein shake with banana",
      unhealthy: "Candy bar"
    },
    {
      scenario: "Late night snack:",
      healthy: "Nuts and dried fruit",
      unhealthy: "Ice cream"
    }
  ];

  const handleChoice = (isHealthy) => {
    if (isHealthy) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="game-content">
      {showScore ? (
        <div className="score-display">
          <h3>Game Complete! 🎉</h3>
          <p className="final-score">Healthy Choices: {score} / {questions.length}</p>
          <p className="score-message">
            {score === questions.length && "Perfect! You're a healthy eating champion! 🏆"}
            {score >= questions.length * 0.7 && score < questions.length && "Excellent! You make great choices! 👍"}
            {score < questions.length * 0.7 && "Good start! Keep making healthier choices! 💪"}
          </p>
          <button className="restart-btn" onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <div className="choices-game">
          <div className="choices-header">
            <span className="question-counter">Question {currentQuestion + 1}/{questions.length}</span>
            <div className="progress-dots">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index <= currentQuestion ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <h3 className="scenario">{questions[currentQuestion].scenario}</h3>
          <div className="choices">
            <button
              className="choice-btn healthy"
              onClick={() => handleChoice(true)}
            >
              ✅ {questions[currentQuestion].healthy}
            </button>
            <button
              className="choice-btn unhealthy"
              onClick={() => handleChoice(false)}
            >
              ❌ {questions[currentQuestion].unhealthy}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
