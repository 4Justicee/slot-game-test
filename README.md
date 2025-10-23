# 🎰 Slots Game - Technical Test Implementation

A complete implementation of a slots game using PixiJS and TypeScript, built as part of a technical assessment.

## 🎮 Live Demo

[Play the game here](https://testslot.luckyverse.club)
## ✨ Features

- **Horizontal Spinning Reels**: Smooth left-to-right symbol movement
- **Sound Effects**: Complete audio system with Howler.js
- **Win Animations**: Spine-based visual effects for wins
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Fully typed codebase with strict type checking
- **Unit Tests**: Comprehensive test coverage with Jest

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/slots-game.git
cd slots-game

# Install dependencies
npm install

# Start development server
npm start
```

### Available Scripts
```bash
npm start           # Development server with hot reload
npm run build       # Production build
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run lint        # ESLint code quality check
```

## 🏗️ Architecture

### Project Structure
```
src/
├── types/           # TypeScript type definitions
├── constants/        # Centralized game constants
├── slots/           # Slot machine and reel logic
├── ui/              # User interface components
├── utils/            # Utility functions (AssetLoader, sound)
└── __tests__/       # Unit tests
```

### Key Components

#### 🎯 Reel System (`src/slots/Reel.ts`)
- Horizontal symbol arrangement
- Smooth spinning animation with configurable speed
- Random symbol generation
- Grid-based positioning with smooth snapping

#### 🎰 Slot Machine (`src/slots/SlotMachine.ts`)
- 4 reels with 6 symbols each
- Win detection with 30% probability
- Spine animation integration
- Sound effect coordination

#### 🔊 Sound System (`src/utils/sound.ts`)
- Howler.js integration
- Multiple sound support (spin, win, button clicks)
- Volume control and error handling
- Automatic preloading

#### 🎨 UI Components (`src/ui/UI.ts`)
- Interactive spin button with hover effects
- Responsive design for mobile devices
- Touch event support

## 🧪 Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Test Coverage
- **Constants**: 100% coverage
- **Sound System**: 80.76% coverage
- **Core Game Logic**: Tested through integration

## 📦 Dependencies

### Production
- `pixi.js`: 2D WebGL renderer
- `pixi-spine`: Spine animation support
- `howler`: Audio management

### Development
- `typescript`: Type safety
- `jest`: Testing framework
- `eslint`: Code quality
- `webpack`: Module bundling

## 🎯 Technical Requirements Fulfilled

✅ **All TODOs Implemented**: Every TODO comment addressed  
✅ **Horizontal Spinning**: Smooth left-to-right reel movement  
✅ **Sound Player**: Complete audio system with Howler.js  
✅ **Refactoring**: Clean, maintainable code structure  
✅ **Unit Tests**: Jest test suite with good coverage  
✅ **TypeScript**: Consistent typing throughout codebase  

## 🔧 Configuration

### Game Constants (`src/constants/index.ts`)
- Reel count: 4 reels
- Symbols per reel: 6
- Symbol size: 150px
- Win probability: 30%
- Animation speeds and timing

### Build Configuration
- **Webpack**: Production and development builds
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality enforcement

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch event support
- Mobile-optimized button sizing
- Responsive scaling
- Orientation support

## 🎨 Assets

- **Symbols**: 5 different slot symbols
- **Sounds**: Spin, win, and button click effects
- **Animations**: Spine-based win animations
- **UI**: Custom button graphics

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Set source to `/dist` folder

### Other Hosting
The `dist/` folder contains all static files needed for deployment.

## 📋 Development Notes

### Code Quality
- **ESLint**: Zero warnings or errors
- **TypeScript**: Strict type checking
- **Tests**: All tests passing
- **Documentation**: Comprehensive inline comments

### Performance
- Efficient asset loading and caching
- Optimized animations
- Minimal bundle size
- Fast startup time

## 🤝 Contributing

This is a technical test implementation. For questions or issues, please contact the developer.

## 📄 License

This project is part of a technical assessment and is not intended for commercial use.

---

**Built with ❤️ using PixiJS, TypeScript, and modern web technologies**
