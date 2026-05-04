# HIIT Intervals Timer ⏱️

A fully self-contained, static HIIT (High-Intensity Interval Training) timer built with pure HTML, CSS, and vanilla JavaScript. No build tools, no dependencies, no backend — just open and use!

## 🚀 Live Demo

**Access the timer here:** [https://summer-marie.github.io/intervals-timer/](https://summer-marie.github.io/intervals-timer/)

Simply open `index.html` in any modern browser or deploy to GitHub Pages for instant access anywhere.

## ✨ Features

### Core Functionality
- **Customizable Workouts**: Configure rounds, sets, work/rest intervals to match your training needs
- **Full-Screen Timer Display**: Giant countdown numbers optimized for visibility during intense workouts
- **Smart Phase Tracking**: Automatically transitions between work time, round breaks, and set breaks
- **Visual & Audio Cues**: 
  - Circular progress ring that drains with each interval
  - Round progress dots showing completed/current/upcoming rounds
  - Web Audio API beeps (no audio files needed):
    - High beep when rounds start
    - Double beep for breaks
    - 3-2-1 countdown beeps in final seconds
    - Completion melody when workout finishes
  - Color-coded phases (teal for work, red for breaks)

### Preset Workouts
Choose from popular HIIT formats or create your own:

- **Tabata Classic**: 8 rounds × 20s work / 10s rest, 1 set  
  *The original Tabata protocol for maximum intensity*

- **AMRAP Intervals**: 10 rounds × 40s work / 20s rest, 3 sets, 60s set break  
  *As Many Rounds As Possible - endurance-focused*

- **Pyramid**: 5 rounds × 30s work / 15s rest, 3 sets, 45s set break  
  *Balanced intensity with moderate recovery*

- **Endurance Block**: 6 rounds × 45s work / 15s rest, 4 sets, 90s set break  
  *Longer work intervals for building stamina*

- **Sprint Intervals**: 10 rounds × 15s work / 45s rest, 3 sets, 60s set break  
  *Short bursts with extended recovery*

- **Custom**: Design your own workout from scratch

### Workout Summary
Upon completion, view:
- Total workout time
- Total rounds completed
- Number of sets finished
- Randomized motivational messages

### Customization
- **8 Background Patterns**: Geometric CSS patterns (temple, circuit board, moroccan, etc.)
- **8 Color Themes**: From dark gray to vibrant teal, purple, crimson, and more
- **Sound Toggle**: Mute/unmute audio cues with one tap

### Mobile-Optimized
- Responsive design works on phones, tablets, and desktops
- Large tap targets (≥ 44px) for easy control during workouts
- Countdown numbers scale beautifully on any screen size

## 🎯 How to Use

1. **Choose a Preset** or select "Custom" to configure your own workout
2. **Adjust Settings** (if needed):
   - Round Count: 1-99 rounds per set
   - Round Duration: 10s to 2 minutes
   - Break Between Rounds: None to 60s
   - Number of Sets: 1-8
   - Break Between Sets: None to 2 minutes
3. **Customize Look** (optional):
   - Click "Backgrounds" to choose a pattern
   - Click "Colors" to select a color theme
4. **Start Timer** and get moving!
5. **Pause/Resume/Stop** as needed during your workout

## 🛠️ Technical Details

- **Zero Dependencies**: No npm, no Node.js, no build process
- **Single File**: Entire app in one `index.html` file (~30KB)
- **GitHub Pages Ready**: Deploy by simply enabling Pages on your repo
- **Modern Web Standards**:
  - CSS Grid & Flexbox for layout
  - CSS Custom Properties for theming
  - Web Audio API for sound generation
  - SVG for animated countdown ring
  - Responsive design with CSS clamp() and viewport units

## 📦 Deployment to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**
6. Your timer will be live at `https://[your-username].github.io/intervals-timer/`

## 🎨 Customization

All styles and logic are contained in `index.html`. To customize:

- **Colors**: Modify CSS custom properties in the `:root` section
- **Fonts**: Change the Google Fonts link (currently using "Rajdhani")
- **Background Patterns**: Edit the `.hero-pattern-*` classes
- **Presets**: Update the `presets` array in the JavaScript section
- **Audio**: Adjust frequency/duration in the `playBeep()` function

## 🏋️ Perfect For

- HIIT workouts
- Tabata training
- Boxing/MMA rounds
- Circuit training
- Yoga/meditation intervals
- Classroom timing activities
- Cooking timers
- Productivity techniques (Pomodoro variations)

## 📁 Project Structure

```
intervals-timer/
├── index.html              # The complete standalone app
├── client/                 # Legacy React version (optional)
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   └── package.json
└── README.md              # This file
```

**Note**: The `/client` folder contains the original React + Vite version. The new `index.html` at the root is the static, zero-dependency version optimized for GitHub Pages.

## 📄 License

Free to use and modify. No attribution required.

## 🙏 Credits

Built with ❤️ for the fitness community. Background patterns inspired by [Hero Patterns](https://heropatterns.com/).

---

**Get started now:** Open `index.html` in your browser or visit the [live demo](https://summer-marie.github.io/intervals-timer/)!
