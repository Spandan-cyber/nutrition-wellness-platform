import '../Resources.css';

const WorkoutPlans = () => {
  return (
    <div className="resource-detail-page">
      <div className="resource-hero">
        <h1>💪 Workout Plans</h1>
        <p>Beginner to advanced fitness routines</p>
      </div>

      <div className="resource-content">
        <section className="guide-section">
          <h2>Beginner Workout Plan</h2>
          <p>Perfect for those just starting their fitness journey. 3 days per week, 30-45 minutes per session.</p>
          
          <div className="guide-card">
            <h3>Day 1: Full Body</h3>
            <ul className="tips-list">
              <li>✓ Warm-up: 5 min light cardio</li>
              <li>✓ Squats: 3 sets x 10 reps</li>
              <li>✓ Push-ups: 3 sets x 8 reps</li>
              <li>✓ Rows: 3 sets x 10 reps</li>
              <li>✓ Cool-down: 5 min stretching</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Day 2: Cardio & Core</h3>
            <ul className="tips-list">
              <li>✓ Warm-up: 5 min dynamic stretching</li>
              <li>✓ Jogging/Walking: 20 minutes</li>
              <li>✓ Planks: 3 sets x 30 seconds</li>
              <li>✓ Crunches: 3 sets x 15 reps</li>
              <li>✓ Cool-down: 5 min stretching</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Day 3: Full Body</h3>
            <ul className="tips-list">
              <li>✓ Warm-up: 5 min light cardio</li>
              <li>✓ Lunges: 3 sets x 10 reps each leg</li>
              <li>✓ Dumbbell Press: 3 sets x 10 reps</li>
              <li>✓ Lat Pulldowns: 3 sets x 10 reps</li>
              <li>✓ Cool-down: 5 min stretching</li>
            </ul>
          </div>
        </section>

        <section className="guide-section">
          <h2>Intermediate Workout Plan</h2>
          <p>For those with 3-6 months of training experience. 4-5 days per week, 45-60 minutes per session.</p>
          
          <div className="guide-card">
            <h3>Upper Body Day</h3>
            <ul className="tips-list">
              <li>✓ Bench Press: 4 sets x 6-8 reps</li>
              <li>✓ Barbell Rows: 4 sets x 6-8 reps</li>
              <li>✓ Incline Dumbbell Press: 3 sets x 8-10 reps</li>
              <li>✓ Pull-ups: 3 sets x 8-10 reps</li>
              <li>✓ Bicep Curls: 3 sets x 10-12 reps</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Lower Body Day</h3>
            <ul className="tips-list">
              <li>✓ Squats: 4 sets x 6-8 reps</li>
              <li>✓ Deadlifts: 3 sets x 5-6 reps</li>
              <li>✓ Leg Press: 3 sets x 8-10 reps</li>
              <li>✓ Leg Curls: 3 sets x 10-12 reps</li>
              <li>✓ Calf Raises: 3 sets x 12-15 reps</li>
            </ul>
          </div>
        </section>

        <section className="guide-section">
          <h2>Advanced Workout Plan</h2>
          <p>For experienced lifters. 5-6 days per week, 60-90 minutes per session.</p>
          
          <div className="guide-card">
            <h3>Push Day</h3>
            <ul className="tips-list">
              <li>✓ Barbell Bench Press: 4 sets x 4-6 reps</li>
              <li>✓ Incline Barbell Press: 4 sets x 6-8 reps</li>
              <li>✓ Dumbbell Flyes: 3 sets x 8-10 reps</li>
              <li>✓ Shoulder Press: 4 sets x 6-8 reps</li>
              <li>✓ Tricep Dips: 3 sets x 8-10 reps</li>
            </ul>
          </div>

          <div className="guide-card">
            <h3>Pull Day</h3>
            <ul className="tips-list">
              <li>✓ Deadlifts: 4 sets x 3-5 reps</li>
              <li>✓ Barbell Rows: 4 sets x 5-7 reps</li>
              <li>✓ Pull-ups: 4 sets x 6-8 reps</li>
              <li>✓ Lat Pulldowns: 3 sets x 8-10 reps</li>
              <li>✓ Barbell Curls: 3 sets x 6-8 reps</li>
            </ul>
          </div>
        </section>

        <section className="guide-section">
          <h2>Workout Tips</h2>
          <ul className="tips-list">
            <li>✓ Always warm up before exercising</li>
            <li>✓ Focus on proper form over heavy weight</li>
            <li>✓ Rest 48 hours between training the same muscle groups</li>
            <li>✓ Stay hydrated throughout your workout</li>
            <li>✓ Cool down and stretch after each session</li>
            <li>✓ Progressive overload - gradually increase weight or reps</li>
            <li>✓ Get 7-9 hours of sleep for recovery</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WorkoutPlans;
