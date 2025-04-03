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

## Project Structure

```

WorkoutApp-frontend/
├── src/
│ ├── components/
│ │ ├── ProgressCard.tsx
│ │ ├── StopWatch.tsx
│ │ ├── WorkoutForm.tsx
│ │ └── WorkoutList.tsx
│ ├── navigation/
│ │ └── AppNavigator.tsx
│ ├── screens/
│ │ ├── HomeScreen.tsx
│ │ └── WorkoutsScreen.tsx
│ ├── services/
│ │ └── workoutService.ts
│ └── types/
│ └── workout.ts
├── App.tsx
└── package.json

```
