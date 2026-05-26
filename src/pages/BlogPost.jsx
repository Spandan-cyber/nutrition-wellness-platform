import { useParams, Link } from 'react-router-dom';
import './Blog.css';

const BlogPost = () => {
  const { id } = useParams();
  
  const blogContent = {
    1: {
      title: '10 Tips for Tracking Macros Effectively',
      date: 'May 15, 2026',
      category: 'Nutrition',
      content: `
        <h2>Master Macro Tracking for Better Results</h2>
        <p>Macro tracking is one of the most effective ways to optimize your nutrition and achieve your fitness goals. Whether you're looking to build muscle, lose fat, or improve athletic performance, understanding and tracking your macronutrients is crucial.</p>
        
        <h3>1. Use a Food Scale</h3>
        <p>Accuracy starts with proper measurement. A digital food scale ensures you're logging the correct portions, not estimates.</p>
        
        <h3>2. Log Everything</h3>
        <p>Even small snacks add up. Consistency in logging helps you identify patterns and make adjustments.</p>
        
        <h3>3. Understand Your Macros</h3>
        <p>Protein: 4 calories per gram | Carbs: 4 calories per gram | Fats: 9 calories per gram</p>
        
        <h3>4. Set Realistic Targets</h3>
        <p>General guidelines: Protein 0.7-1g per lb of body weight, Carbs 2-3g per lb, Fats 0.3-0.4g per lb</p>
        
        <h3>5. Track Consistently</h3>
        <p>Aim for at least 4-8 weeks of consistent tracking to see patterns and results.</p>
        
        <h3>6. Use Reliable Apps</h3>
        <p>Apps like MyFitnessPal, Cronometer, and MacroFactor make tracking easier and more accurate.</p>
        
        <h3>7. Adjust Based on Progress</h3>
        <p>If you're not seeing results after 2-3 weeks, adjust your macros by 5-10%.</p>
        
        <h3>8. Don't Obsess Over Perfection</h3>
        <p>Aim for 80-90% accuracy. Perfect tracking isn't sustainable long-term.</p>
        
        <h3>9. Track Micronutrients Too</h3>
        <p>While macros are important, don't forget about vitamins and minerals for overall health.</p>
        
        <h3>10. Learn from Your Data</h3>
        <p>Review your logs weekly to identify trends and make informed adjustments.</p>
        
        <h3>Learn More</h3>
        <p>For more information on macro tracking, check out these resources:</p>
        <ul>
          <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5852756/" target="_blank" rel="noopener noreferrer">NCBI: Macronutrient Distribution and Health</a></li>
          <li><a href="https://www.eatthismuch.com/" target="_blank" rel="noopener noreferrer">Eat This Much - Macro Calculator</a></li>
          <li><a href="https://www.myfitnesspal.com/" target="_blank" rel="noopener noreferrer">MyFitnessPal - Nutrition Tracking App</a></li>
        </ul>
      `
    },
    2: {
      title: 'Understanding Protein Requirements for Your Goals',
      date: 'May 10, 2026',
      category: 'Protein',
      content: `
        <h2>How Much Protein Do You Really Need?</h2>
        <p>Protein is essential for muscle repair, recovery, and overall health. But how much do you actually need? The answer depends on your goals, activity level, and lifestyle.</p>
        
        <h3>General Protein Guidelines</h3>
        <p><strong>Sedentary Adults:</strong> 0.8g per kg of body weight (0.36g per lb)</p>
        <p><strong>Active Individuals:</strong> 1.2-1.6g per kg (0.54-0.73g per lb)</p>
        <p><strong>Muscle Building:</strong> 1.6-2.2g per kg (0.73-1g per lb)</p>
        <p><strong>Endurance Athletes:</strong> 1.2-1.4g per kg (0.54-0.64g per lb)</p>
        
        <h3>Protein for Muscle Growth</h3>
        <p>If your goal is to build muscle, aim for 0.7-1g of protein per pound of body weight. This supports muscle protein synthesis and recovery.</p>
        
        <h3>Protein for Weight Loss</h3>
        <p>Higher protein intake (1-1.2g per lb) helps preserve muscle mass during calorie deficits and increases satiety.</p>
        
        <h3>Best Protein Sources</h3>
        <ul>
          <li>Chicken breast (31g protein per 100g)</li>
          <li>Salmon (25g protein per 100g)</li>
          <li>Eggs (13g protein per 100g)</li>
          <li>Greek yogurt (10g protein per 100g)</li>
          <li>Legumes (8-9g protein per 100g cooked)</li>
          <li>Protein powder (20-30g per serving)</li>
        </ul>
        
        <h3>Timing Matters</h3>
        <p>Distribute protein throughout the day. Aim for 20-40g per meal for optimal muscle protein synthesis.</p>
        
        <h3>Learn More</h3>
        <ul>
          <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568241/" target="_blank" rel="noopener noreferrer">NCBI: Protein and Exercise</a></li>
          <li><a href="https://www.issn.org/" target="_blank" rel="noopener noreferrer">International Society of Sports Nutrition</a></li>
        </ul>
      `
    },
    3: {
      title: 'Meal Prep for Beginners: A Complete Guide',
      date: 'May 5, 2026',
      category: 'Meal Planning',
      content: `
        <h2>Start Meal Prepping Today</h2>
        <p>Meal prepping is one of the best ways to stay consistent with your nutrition, save time, and reduce food waste. Here's how to get started.</p>
        
        <h3>Why Meal Prep?</h3>
        <ul>
          <li>Save 5-10 hours per week on cooking</li>
          <li>Stay consistent with your nutrition goals</li>
          <li>Reduce food waste</li>
          <li>Save money on groceries</li>
          <li>Avoid impulsive unhealthy food choices</li>
        </ul>
        
        <h3>Getting Started</h3>
        <p><strong>Step 1:</strong> Choose a prep day (usually Sunday)</p>
        <p><strong>Step 2:</strong> Plan your meals for the week</p>
        <p><strong>Step 3:</strong> Make a shopping list</p>
        <p><strong>Step 4:</strong> Cook in batches</p>
        <p><strong>Step 5:</strong> Store in containers</p>
        
        <h3>Simple Meal Prep Formula</h3>
        <p>Each meal should contain:</p>
        <ul>
          <li>Protein (chicken, fish, tofu, beans)</li>
          <li>Carbs (rice, sweet potato, oats)</li>
          <li>Vegetables (broccoli, spinach, peppers)</li>
          <li>Healthy fats (olive oil, avocado, nuts)</li>
        </ul>
        
        <h3>Storage Tips</h3>
        <ul>
          <li>Use glass containers for durability</li>
          <li>Store in the fridge for 3-4 days</li>
          <li>Freeze for longer storage (up to 3 months)</li>
          <li>Label containers with date and contents</li>
        </ul>
        
        <h3>Learn More</h3>
        <ul>
          <li><a href="https://www.eatthismuch.com/" target="_blank" rel="noopener noreferrer">Eat This Much - Meal Planning</a></li>
          <li><a href="https://www.mealprepsunday.com/" target="_blank" rel="noopener noreferrer">Meal Prep Sunday</a></li>
        </ul>
      `
    },
    4: {
      title: 'The Science Behind Calorie Deficits and Weight Loss',
      date: 'April 28, 2026',
      category: 'Weight Loss',
      content: `
        <h2>Understanding Calorie Deficits</h2>
        <p>Weight loss fundamentally comes down to calories in vs. calories out. To lose weight, you need to consume fewer calories than you burn.</p>
        
        <h3>How Calorie Deficits Work</h3>
        <p>Your body burns calories through:</p>
        <ul>
          <li>Basal Metabolic Rate (BMR) - calories burned at rest</li>
          <li>Thermic Effect of Food (TEF) - calories burned digesting food</li>
          <li>Activity Energy Expenditure (AEE) - calories burned through exercise</li>
          <li>Non-Exercise Activity Thermogenesis (NEAT) - daily movement</li>
        </ul>
        
        <h3>Creating a Deficit</h3>
        <p>A deficit of 300-500 calories per day typically results in 0.5-1 lb of weight loss per week.</p>
        <p>Larger deficits (1000+ calories) can lead to muscle loss and metabolic adaptation.</p>
        
        <h3>Sustainable Approach</h3>
        <ul>
          <li>Aim for 0.5-1 lb weight loss per week</li>
          <li>Maintain adequate protein intake</li>
          <li>Include resistance training</li>
          <li>Stay consistent for 8-12 weeks</li>
        </ul>
        
        <h3>Learn More</h3>
        <ul>
          <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5639963/" target="_blank" rel="noopener noreferrer">NCBI: Energy Balance and Weight Loss</a></li>
          <li><a href="https://www.tdee.fit/" target="_blank" rel="noopener noreferrer">TDEE Calculator</a></li>
        </ul>
      `
    },
    5: {
      title: 'Best Foods for Post-Workout Recovery',
      date: 'April 20, 2026',
      category: 'Recovery',
      content: `
        <h2>Optimize Your Post-Workout Nutrition</h2>
        <p>What you eat after your workout is crucial for recovery, muscle growth, and performance. Here's what you need to know.</p>
        
        <h3>Post-Workout Nutrition Goals</h3>
        <ul>
          <li>Replenish glycogen stores</li>
          <li>Repair muscle damage</li>
          <li>Reduce muscle soreness</li>
          <li>Prepare for next workout</li>
        </ul>
        
        <h3>Ideal Post-Workout Meal</h3>
        <p><strong>Protein:</strong> 20-40g to support muscle repair</p>
        <p><strong>Carbs:</strong> 40-80g to replenish glycogen</p>
        <p><strong>Timing:</strong> Within 1-2 hours post-workout</p>
        
        <h3>Best Post-Workout Foods</h3>
        <ul>
          <li>Chicken with rice and vegetables</li>
          <li>Salmon with sweet potato</li>
          <li>Greek yogurt with berries and granola</li>
          <li>Protein shake with banana and oats</li>
          <li>Tuna sandwich on whole wheat</li>
          <li>Eggs with toast and fruit</li>
        </ul>
        
        <h3>Hydration</h3>
        <p>Drink 16-24 oz of water for every pound of body weight lost during exercise.</p>
        
        <h3>Learn More</h3>
        <ul>
          <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5099041/" target="_blank" rel="noopener noreferrer">NCBI: Post-Exercise Nutrition</a></li>
          <li><a href="https://www.issn.org/" target="_blank" rel="noopener noreferrer">International Society of Sports Nutrition</a></li>
        </ul>
      `
    },
    6: {
      title: 'Hydration: Why Water Intake Matters More Than You Think',
      date: 'April 15, 2026',
      category: 'Hydration',
      content: `
        <h2>The Importance of Proper Hydration</h2>
        <p>Water is essential for every function in your body. Proper hydration affects performance, recovery, and overall health.</p>
        
        <h3>Functions of Water</h3>
        <ul>
          <li>Regulates body temperature</li>
          <li>Transports nutrients and oxygen</li>
          <li>Removes waste products</li>
          <li>Lubricates joints</li>
          <li>Supports cognitive function</li>
          <li>Aids digestion</li>
        </ul>
        
        <h3>How Much Water Do You Need?</h3>
        <p><strong>General Rule:</strong> Half your body weight in ounces per day</p>
        <p><strong>Example:</strong> 200 lb person = 100 oz (about 3 liters) per day</p>
        <p><strong>Athletes:</strong> Add 16-24 oz per hour of exercise</p>
        
        <h3>Signs of Dehydration</h3>
        <ul>
          <li>Dark urine</li>
          <li>Dry mouth and lips</li>
          <li>Fatigue and weakness</li>
          <li>Dizziness</li>
          <li>Reduced performance</li>
        </ul>
        
        <h3>Hydration Tips</h3>
        <ul>
          <li>Drink water throughout the day</li>
          <li>Monitor urine color (pale yellow is ideal)</li>
          <li>Drink before, during, and after exercise</li>
          <li>Include electrolytes for intense workouts</li>
          <li>Eat water-rich foods (fruits, vegetables)</li>
        </ul>
        
        <h3>Learn More</h3>
        <ul>
          <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4207053/" target="_blank" rel="noopener noreferrer">NCBI: Hydration and Health</a></li>
          <li><a href="https://www.cdc.gov/nutrition/data-statistics/added-sugars.html" target="_blank" rel="noopener noreferrer">CDC: Nutrition and Hydration</a></li>
        </ul>
      `
    }
  };

  const post = blogContent[id];

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-hero">
          <h1>Post Not Found</h1>
        </div>
        <div className="blog-content">
          <p>Sorry, this blog post doesn't exist.</p>
          <Link to="/blog" className="read-more">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <Link to="/blog" className="back-link">← Back to Blog</Link>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{post.date}</span>
        </div>
      </div>
      <div className="blog-content">
        <article className="blog-post-full" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default BlogPost;
