import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import NutritionPlans from './pages/services/NutritionPlans';
import FitnessTracking from './pages/services/FitnessTracking';
import MealPlanning from './pages/services/MealPlanning';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import NutritionGuide from './pages/resources/NutritionGuide';
import MealPrepTips from './pages/resources/MealPrepTips';
import WorkoutPlans from './pages/resources/WorkoutPlans';
import RecipeDatabase from './pages/resources/RecipeDatabase';
import CalorieCalculator from './pages/resources/CalorieCalculator';
import BMICalculator from './pages/resources/BMICalculator';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import GamesPage from './pages/GamesPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/nutrition-plans" element={<NutritionPlans />} />
          <Route path="services/fitness-tracking" element={<FitnessTracking />} />
          <Route path="services/meal-planning" element={<MealPlanning />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/nutrition-guide" element={<NutritionGuide />} />
          <Route path="resources/meal-prep-tips" element={<MealPrepTips />} />
          <Route path="resources/workout-plans" element={<WorkoutPlans />} />
          <Route path="resources/recipe-database" element={<RecipeDatabase />} />
          <Route path="resources/calorie-calculator" element={<CalorieCalculator />} />
          <Route path="resources/bmi-calculator" element={<BMICalculator />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
