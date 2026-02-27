# Copilot Instructions for Word Search Puzzle Game

## Project Overview

This is a **React + TypeScript** word search puzzle game built with **Vite**. Players can choose themed word lists or enter custom words, then find them in a generated grid by clicking and dragging across letters.

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with shadcn/ui components (New York style)
- **Animations**: Framer Motion
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **State**: React hooks with localStorage for persistence (`useLocalStorage` hook)
- **Notifications**: Sonner toast library

## Project Structure

- `src/App.tsx` — Main application component managing game state
- `src/components/` — Feature components (WordInput, WordSearchGrid, WordBank, Timer, Leaderboard, CompletionDialog)
- `src/components/ui/` — Reusable shadcn/ui components
- `src/hooks/` — Custom hooks (`useLocalStorage`, `use-mobile`)
- `src/lib/` — Utilities (`wordSearchGenerator.ts`, `wordThemes.ts`, `utils.ts`)
- `src/styles/` — Theme CSS
- `src/main.tsx` — App entry point
- `vite.config.ts` — Vite configuration with GitHub Pages base path

## Conventions

- Use `@/` path alias for imports from `src/`
- UI components follow shadcn/ui patterns with Radix UI primitives
- Use `cn()` from `@/lib/utils` for conditional class merging
- Use Phosphor Icons (not Lucide) for feature components
- Use `useLocalStorage` hook for persistent state (leaderboard data)
- Keep words uppercase in the puzzle generator

## Commands

- `npm run dev` — Start development server
- `npm run build` — Build for production (no TypeScript type-checking)
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

## Deployment

The app deploys to GitHub Pages automatically on push to `main` via the `.github/workflows/deploy.yml` workflow. The Vite `base` is set to `/word-search-puzzle-g/` for correct asset paths.
