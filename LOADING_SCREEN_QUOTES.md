# Motivational Quotes in Loading Screen

## Current Quotes (10 Total)

The loading screen rotates through these motivational quotes every 800ms:

1. **🥗 Eat well, live well!**
   - Simple, direct message about healthy eating

2. **🍎 An apple a day keeps the doctor away!**
   - Classic wellness saying with apple emoji

3. **💪 Fuel your body, fuel your dreams!**
   - Empowering message about nutrition and goals

4. **🥕 Nutrition is the foundation of health!**
   - Educational message about nutrition importance

5. **🍌 Healthy choices, happy life!**
   - Positive reinforcement about healthy decisions

6. **🥦 Grow stronger with every meal!**
   - Motivational message about progress

7. **🍽️ Nourish your body, elevate your mind!**
   - Holistic wellness message

8. **🌱 Small steps to big health goals!**
   - Encouraging message about progress

9. **💚 Your health is your wealth!**
   - Inspirational message about health value

10. **🎯 Every bite counts towards your goals!**
    - Motivational message about consistency

---

## How to Add More Quotes

Edit `src/components/LoadingScreen.jsx` and add to the `motivations` array:

```javascript
const motivations = [
  "🥗 Eat well, live well!",
  "🍎 An apple a day keeps the doctor away!",
  // ... existing quotes ...
  "🥑 Your new quote here!",  // Add new quote
];
```

---

## Quote Rotation Timing

- **Display Duration**: 800ms per quote
- **Animation**: Smooth slide-in from bottom
- **Total Cycle**: ~8 seconds (10 quotes × 800ms)
- **Repeats**: Continuously during 4-second loading

---

## Customization Ideas

### By Time of Day
```javascript
const getMotivationByTime = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "🌅 Start your day right!";
  if (hour < 18) return "🌤️ Keep up the momentum!";
  return "🌙 Nourish yourself tonight!";
};
```

### By User Goal
```javascript
const motivationsByGoal = {
  weightLoss: ["🏃 Every step counts!", "💪 You got this!"],
  muscleGain: ["💪 Fuel your gains!", "🥗 Protein power!"],
  wellness: ["🌱 Balance is key!", "💚 Feel your best!"],
};
```

### By User Name
```javascript
const userName = localStorage.getItem('userName');
const personalQuote = `${userName}, you're doing amazing! 💪`;
```

---

## Emoji Guide

| Emoji | Meaning |
|-------|---------|
| 🥗 | Salad / Healthy eating |
| 🍎 | Apple / Health |
| 💪 | Strength / Power |
| 🥕 | Carrot / Nutrition |
| 🍌 | Banana / Energy |
| 🥦 | Broccoli / Health |
| 🍽️ | Plate / Meal |
| 🌱 | Growth / Progress |
| 💚 | Health / Wellness |
| 🎯 | Goals / Target |
| 🌅 | Morning |
| 🌤️ | Afternoon |
| 🌙 | Evening |
| 🏃 | Activity / Exercise |
| 🥑 | Healthy fat |

---

## Performance Notes

- Quotes rotate every 800ms (smooth, not too fast)
- Animation is GPU-accelerated (smooth 60fps)
- No performance impact on loading time
- Quotes are pre-loaded in memory

---

**Total Quotes**: 10
**Rotation Speed**: 800ms per quote
**Total Cycle**: ~8 seconds
**Loading Duration**: 4 seconds (quotes cycle 0.5 times)
