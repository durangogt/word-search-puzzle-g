# 🔍 Word Search Puzzle Game

A dynamic word search puzzle game where users create custom puzzles by entering their own words or selecting themed word lists, then find them in a generated grid by clicking and dragging across letters.

![Word Search Game](https://github.com/user-attachments/assets/1c0ac2c1-1d2b-4992-9ae5-be78945bd0fb)

## Features

- **12 themed word lists** — Animals, Sports, Food, Nature, Space, Colors, Weather, Music, Ocean, Vehicles, Fruits, Countries
- **Custom word input** — Enter your own words (3–15 words, 3–12 characters each)
- **Interactive grid** — Click and drag to select words in 8 directions
- **Timer** — Tracks completion time
- **Leaderboard** — Persistent scores stored in localStorage

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- npm

### Install Dependencies

```bash
npm install
```

### Run the App

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173/`). Note: the `/word-search-puzzle-g/` base path is only used for the GitHub Pages production deployment, not during local development.

### Build for Production

```bash
npm run build
```

The output is written to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Testing

There are currently no automated tests. To manually verify the app works:

1. Start the dev server with `npm run dev`
2. Select a themed puzzle (e.g. Animals) and confirm the grid generates
3. Click and drag across letters to find a word — verify it highlights and appears as found in the Word Bank
4. Complete a puzzle, enter a name in the completion dialog, and verify the score saves to the leaderboard

## Deployment

The app is deployed to **GitHub Pages** automatically on every push to `main` via the `.github/workflows/deploy.yml` workflow.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 + shadcn/ui
- Framer Motion
- Phosphor Icons

## License

Licensed under the terms of the MIT license.
