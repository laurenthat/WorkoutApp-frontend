# WorkoutApp Frontend

A React Native mobile application for tracking workouts, built with Expo and TypeScript.

## Features

- Track workouts with exercise details
- Real-time stopwatch for workout sessions
- Progress tracking with statistics
- Bottom sheet for workout form interactions
- Modern UI with gesture handling and animations
- Works in connection with the [WorkoutApp backend repository](https://github.com/laurenthat/WorkoutApp-backend)

## Technologies

- React Native
- Expo
- TypeScript
- React Navigation
- React Native Reanimated
- React Native Gesture Handler
- Axios for API calls
- React Native Bottom Sheet

## Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd WorkoutApp-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Install Expo CLI globally, if not already installed:

```bash
npm install -g expo-cli
```

4. Update the API URL in the services to match your backend server address.

## Running the Application

Start the server:

```bash
npm start
```

## Development Scripts

```bash
# Run linter
npm run lint
npm run lint:fix          # Auto-fix linting issues

# Code formatting
npm run format             # Format all files
npm run format:check      # Check if files are formatted

# Testing
npm test                  # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report

# Type checking
npm run type-check        # Run TypeScript compiler check
```

## Testing

This project uses **Jest** and **React Native Testing Library** for unit testing.

### Running Tests

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode (re-runs on file changes)
- `npm run test:coverage` - Generate coverage reports

### Test Coverage

Current coverage: **ProgressCard component: 100%**

Test files are located in `src/components/__tests__/` and follow the naming pattern `*.test.tsx`.

## Code Quality

### Linting & Formatting

- **ESLint** with TypeScript, React, and React Native plugins
- **Prettier** for consistent code formatting
- **Automatic formatting** on save (if configured in your editor)

### Pre-commit Checks

The project enforces code quality through:

- Linting checks (ESLint)
- Type checking (TypeScript)
- Unit test execution
- Code formatting (Prettier)

## CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration:

### Automated Checks

Every pull request triggers:

- ✅ **Linting** (ESLint)
- ✅ **Type checking** (TypeScript)
- ✅ **Unit tests** (Jest)
- ✅ **Code formatting** (Prettier)

### Branch Protection

The `main` branch is protected and requires:

- All status checks to pass
- Pull request reviews
- Up-to-date branches before merging

### 🛡️ Setting Up Branch Protection Rules

To enable branch protection that prevents merging when tests fail:

1. **Go to Repository Settings**
   - Navigate to: `https://github.com/laurenthat/WorkoutApp-frontend`
   - Click **Settings** tab → **Branches**

2. **Add Branch Protection Rule**
   - Click **Add rule**
   - Branch name pattern: `main`

3. **Configure Protection Settings**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require pull request reviews** (1 reviewer minimum)
   - ✅ **Dismiss stale PR approvals** when new commits are pushed

4. **Required Status Checks**
   Add these required checks:
   - `test-and-lint`
   - `quality-gate`

### 🧪 Testing the Pipeline

1. Make a change that breaks linting
2. Push to a feature branch
3. Create PR to main - pipeline should fail ❌
4. Fix the issue - pipeline should pass ✅

## Project Structure

```
WorkoutApp-frontend/
├── .github/
│   └── workflows/
│       └── ci.yml                 # CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── __tests__/
│   │   │   └── ProgressCard.test.tsx
│   │   ├── ProgressCard.tsx
│   │   ├── StopWatch.tsx
│   │   ├── WorkoutForm.tsx
│   │   └── WorkoutList.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   └── WorkoutsScreen.tsx
│   ├── services/
│   │   └── workoutService.ts
│   └── types/
│       └── workout.ts
├── App.tsx
├── jest.config.json              # Jest configuration
├── jest-setup.js                 # Test environment setup
├── eslint.config.js              # ESLint configuration
├── .prettierrc.json              # Prettier configuration
└── package.json
```
