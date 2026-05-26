# NutriWell - Nutrition & Wellness Platform

A comprehensive nutrition and wellness tracking platform built with React and Vite. Track your nutrition, plan meals, play interactive games, and achieve your wellness goals with AI-powered recommendations.

## 🌟 Features

### Core Features
- **User Authentication** - Secure login/register with Google Sign-In
- **Nutrition Tracking** - Log foods and track macronutrients (calories, protein, carbs, fats)
- **Dashboard** - Real-time nutrition overview with progress tracking
- **Water Intake Tracker** - Track daily water consumption
- **Weight Tracker** - Monitor weight changes over time
- **Weekly Analytics** - Visualize nutrition trends and patterns

### Resources & Tools
- **Nutrition Guide** - Complete guide to macronutrients and micronutrients
- **Meal Prep Tips** - Strategies for effective meal preparation
- **Workout Plans** - Beginner to advanced fitness routines
- **Recipe Database** - 500+ healthy recipes with nutrition info
- **Calorie Calculator** - Calculate daily caloric needs (TDEE)
- **BMI Calculator** - Check body mass index with recommendations

### Interactive Features
- **Games Section** - 3 interactive nutrition games:
  - Nutrition Quiz (8 questions)
  - Food Matching Game (12 cards)
  - Healthy Choices Game (8 scenarios)
- **Blog** - Real nutrition and wellness articles with external links
- **Services** - Personalized nutrition plans, fitness tracking, meal planning
- **Contact Form** - Email support with FormSubmit API

### User Profile
- **Profile Management** - Edit name, email, and view profile information
- **Avatar Upload** - Custom profile picture upload
- **Profile Dropdown** - Quick access to profile and logout
- **Daily Progress** - View nutrition overview and daily logs

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with responsive design
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Authentication**: Google Sign-In
- **Email**: FormSubmit API
- **Fonts**: Poppins (Google Fonts)
- **Icons**: Custom SVG line art icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nutrition-wellness-platform.git
cd nutrition-wellness-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment files**
```bash
# Copy the example env file
cp backend/.env.example backend/.env
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### Backend Configuration

Update `backend/.env` with your email settings:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@nutriwell.com
JWT_SECRET=your-secret-key
```

## 📁 Project Structure

```
nutrition-wellness-platform/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   │   ├── resources/    # Resource detail pages
│   │   └── services/     # Service detail pages
│   ├── services/         # API services
│   ├── data/             # Static data
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── backend/              # Backend server files
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

## 🎮 Usage

### Logging Food
1. Go to Dashboard
2. Fill in food name and macronutrients
3. Select meal category (Breakfast, Lunch, Dinner, Snack)
4. Click "Log Food"

### Using Calculators
1. Navigate to Resources
2. Click on "Calorie Calculator" or "BMI Calculator"
3. Enter your information
4. View personalized recommendations

### Playing Games
1. Click the Games button in the header
2. Choose from 3 interactive games
3. Test your nutrition knowledge

### Reading Blog Posts
1. Go to Blog section
2. Click on any article
3. Read full content with external links

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy"

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Mobile devices (480px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

## 🎨 Color Scheme

- **Primary Green**: #10b981
- **Dark Green**: #059669
- **Light Green**: #f0fdf4
- **Text Dark**: #1f2937
- **Text Light**: #6b7280

## 🔐 Security

- Environment variables for sensitive data
- No hardcoded API keys
- Secure authentication with Google Sign-In
- FormSubmit API for email handling
- Input validation on forms

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact us at nutriwelldiet@gmail.com

## 🙏 Acknowledgments

- React and Vite communities
- Google Sign-In API
- FormSubmit for email handling
- Unsplash for images
- Google Fonts for Poppins font

---

**Made with ❤️ for your wellness journey**
