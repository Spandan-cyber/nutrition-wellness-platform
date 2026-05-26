import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
  const posts = [
    { 
      id: 1, 
      title: '10 Tips for Tracking Macros Effectively', 
      date: 'May 15, 2026', 
      excerpt: 'Master the art of macro tracking with proven strategies to optimize your nutrition and fitness goals...',
      category: 'Nutrition'
    },
    { 
      id: 2, 
      title: 'Understanding Protein Requirements for Your Goals', 
      date: 'May 10, 2026', 
      excerpt: 'Discover how much protein you really need based on your fitness level, goals, and lifestyle...',
      category: 'Protein'
    },
    { 
      id: 3, 
      title: 'Meal Prep for Beginners: A Complete Guide', 
      date: 'May 5, 2026', 
      excerpt: 'Start meal prepping with these simple, practical strategies to save time and stay consistent...',
      category: 'Meal Planning'
    },
    { 
      id: 4, 
      title: 'The Science Behind Calorie Deficits and Weight Loss', 
      date: 'April 28, 2026', 
      excerpt: 'Learn how calorie deficits work and how to create a sustainable approach to weight loss...',
      category: 'Weight Loss'
    },
    { 
      id: 5, 
      title: 'Best Foods for Post-Workout Recovery', 
      date: 'April 20, 2026', 
      excerpt: 'Optimize your recovery with the right post-workout nutrition to maximize muscle growth...',
      category: 'Recovery'
    },
    { 
      id: 6, 
      title: 'Hydration: Why Water Intake Matters More Than You Think', 
      date: 'April 15, 2026', 
      excerpt: 'Understand the critical role of proper hydration in fitness, health, and overall performance...',
      category: 'Hydration'
    }
  ];

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <h1>Nutrition & Wellness Blog</h1>
        <p>Expert tips, science-backed guides, and practical nutrition insights</p>
      </div>
      <div className="blog-content">
        {posts.map(post => (
          <article key={post.id} className="blog-post-card">
            <div className="post-header">
              <span className="post-category">{post.category}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more">Read More →</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
