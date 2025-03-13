# DeepWork AI

A productivity application designed to help users manage tasks efficiently and maintain focus during work sessions. The app leverages artificial intelligence to prioritize tasks and provide personalized productivity insights.

## Features

- **Task Management**: Create, organize, and prioritize tasks
- **Focus Sessions**: Timed focus sessions with customizable durations
- **Productivity Insights**: AI-generated recommendations based on work patterns
- **Progress Tracking**: Visualize productivity trends and achievements

## Tech Stack

- **Frontend**: React Native with TypeScript, Expo, and Expo Router
- **Backend/Database**: Supabase
- **UI Framework**: React Native Paper
- **AI Processing**: DeepSeek

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/deepwork-ai.git
cd deepwork-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Follow the instructions in the terminal to open the app on your device or emulator.

## Project Structure

```
/DeepworkAI
├── app/                      # Expo Router app directory
│   ├── (auth)/               # Authentication routes
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (main)/               # Main app routes
│   │   ├── index.tsx         # Dashboard screen
│   │   ├── tasks/            # Task-related screens
│   │   ├── focus/            # Focus mode screens
│   │   ├── insights/         # Insights and analytics
│   │   ├── settings/         # App settings
│   │   └── _layout.tsx       # Main layout with navigation
│   └── _layout.tsx           # Root layout
├── components/               # Reusable components
│   ├── common/               # Generic UI components
│   ├── tasks/                # Task-related components
│   ├── focus/                # Focus session components
│   └── insights/             # Analytics components
├── constants/                # App constants
├── hooks/                    # Custom React hooks
├── services/                 # API and service integrations
│   ├── supabase/             # Supabase client and queries
│   ├── ai/                   # AI service integration
│   └── notifications/        # Notification services
├── store/                    # State management
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.io/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
