# Google Flights Clone

A modern flight search application built with React and Vite, featuring a responsive design and dark mode support.

## Features

- ✈️ Flight search with multiple options:
  - One-way, Round-trip, and Multi-city flights
  - Cabin class selection (Economy, Premium Economy, Business, First Class)
  - Flexible passenger selection (Adults, Children, Infants)
- 🌓 Dark/Light mode support
- 📱 Responsive design
- 🔍 Real-time airport search
- 💳 Dynamic pricing display
- 🎨 Modern UI inspired by Google Flights

## Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- RapidAPI account with access to Sky-scrapper API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/google-flights-clone.git
cd google-flights-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_RAPID_API_KEY=your_rapid_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

## Environment Setup

1. Create a `.env` file in the project root
2. Add your API key:
```env
REACT_APP_RAPID_API_KEY=your_rapid_api_key_here
```

3. Add `.env` to your `.gitignore`:
```gitignore
# environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Builds for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)

## Project Structure

```
src/
├── components/
│   ├── airportSearch.jsx    # Airport search with autocomplete
│   ├── dropDown.jsx         # Generic dropdown component
│   ├── flightResult.jsx     # Flight results display
│   ├── footer.jsx          # Footer component
│   ├── header.jsx          # Header with navigation
│   ├── inputField.jsx      # Reusable input component
│   ├── layout.jsx          # Main layout wrapper
│   └── travellerDropdown.jsx # Traveler selection dropdown
├── pages/
│   └── flights.jsx         # Main flights page
├── config/
│   └── index.js           # Configuration and constants
├── App.jsx
└── main.jsx
```

## API Integration

This project uses the Sky-scrapper API from RapidAPI. To set up:

1. Sign up for RapidAPI
2. Subscribe to Sky-scrapper API
3. Get your API key
4. Add to `.env` file

## Styling

- Tailwind CSS for utility-first styling
- Custom CSS for specific components
- React Icons for iconography



## Deployment

1. Build the project:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

3. Deploy the `dist` folder to your hosting service

## Hosted Link
[Click here to view the hosted application](https://flights-clone.onrender.com/)

## GitHub Link
[Click here to view the GitHub repository](https://github.com/gowtham-prog/Flights-clone.git)
