# Intervals Timer

A customizable workout timer application built with React and Vite, featuring dynamic backgrounds and color schemes for an engaging workout experience.

## Features

- ⏱️ **Flexible Timer System**: Configure rounds, sets, and break durations
- 🎨 **Dynamic Backgrounds**: 8 Hero Pattern backgrounds with real-time color customization
- 🌈 **Color Schemes**: 8 predefined color palettes that dynamically change background patterns
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎯 **Workout Tracking**: Visual progress tracking through sets and rounds
- ⏸️ **Timer Controls**: Pause, resume, and stop functionality

## Tech Stack

- **Frontend Framework**: React 18+ with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Patterns**: Hero Patterns (SVG-based backgrounds)
- **State Management**: React useState and useEffect

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/summer-marie/intervals-timer.git
   cd intervals-timer
   ```

2. **Navigate to the client directory**
   ```bash
   cd client
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - The app will be available at `http://localhost:5173`
   - For mobile testing, use the network URL shown in the terminal (e.g., `http://192.168.1.x:5173`)

## Available Scripts

In the client directory, you can run:

- **`npm run dev`** - Starts the development server with hot reload
- **`npm run build`** - Builds the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## Project Structure

```
intervals-timer/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BgOptions.jsx      # Background pattern selector
│   │   │   └── ColorOptions.jsx   # Color scheme selector
│   │   ├── App.jsx                # Main application component
│   │   ├── App.css                # Hero Patterns and CSS variables
│   │   ├── index.css              # Global styles and Tailwind imports
│   │   └── main.jsx               # React DOM render entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Configuration

### Background Patterns
The app includes 8 background patterns from Hero Patterns:
- 4-Point Stars
- Temple
- Bubbles
- Moroccan
- Circuit Board
- Slanted Stars
- Curtain
- Glamorous

### Color Schemes
8 predefined color schemes that dynamically change pattern colors:
- Dark Gray
- Teal Blue
- Purple Night
- Forest Green
- Crimson Red
- Midnight Blue
- Amber Gold
- Rose Pink

### Timer Settings
- **Round Duration**: 10, 15, 30, or 60 seconds
- **Round Count**: 1-99 rounds per set
- **Sets**: 1-8 sets total
- **Break Between Rounds**: 0-60 seconds (5-second increments)
- **Break Between Sets**: 0-60 seconds

## Mobile Testing

### Using Chrome DevTools
1. Open the app in Chrome
2. Press `F12` and click the device icon (📱)
3. Select different phone models to test responsiveness

### Testing on Your Phone
1. Start the dev server: `npm run dev`
2. Note the network URL (e.g., `http://192.168.1.x:5173`)
3. Open that URL in your phone's browser
4. No app installation required!

## Customization

### Adding New Background Patterns
1. Add the CSS pattern to `src/App.css`
2. Update the `backgroundOptions` array in `src/components/BgOptions.jsx`
3. Include a preview SVG path for the tile

### Adding New Color Schemes
1. Add the color scheme object to `colorSchemes` array in `src/components/ColorOptions.jsx`
2. Include `primary` and `secondary` color values

### Modifying Timer Options
- Update dropdown options in `src/App.jsx`
- Modify the `Array.from()` generators for break duration options

## Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Deployment

This app can be deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Any static hosting service**: Upload the contents of `dist/`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure all dependencies are installed correctly
3. Verify Node.js and npm versions meet requirements
4. Try clearing browser cache and restarting the dev server

---

**Happy Training! 🏋️‍♀️**
