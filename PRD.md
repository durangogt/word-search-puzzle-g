# Planning Guide

A dynamic word search puzzle game where users create custom puzzles by entering their own words, then find them in a generated grid by clicking and dragging across letters.

**Experience Qualities**: 
1. **Playful** - Vibrant colors and smooth interactions that evoke nostalgia for classic puzzle books while feeling modern and digital
2. **Satisfying** - Clear visual feedback when words are found with delightful animations that reward discovery
3. **Intuitive** - Straightforward flow from word entry to puzzle completion with obvious affordances for interaction

**Complexity Level**: Light Application (multiple features with basic state)
  - The app manages word input, puzzle generation, mouse interactions for word selection, and game state tracking across multiple puzzle sessions

## Essential Features

### Word Input Interface
- **Functionality**: Accept a list of words from the user (comma-separated or line-separated) OR allow selection from predefined themed word lists (animals, sports, food, nature, space, colors, weather, music, ocean, vehicles, fruits, countries)
- **Purpose**: Allow users to quickly start a themed puzzle or personalize puzzles with custom words (holidays, vocabulary, names, etc.)
- **Trigger**: Initial app load or "Create New Puzzle" button
- **Progression**: Theme selection view OR custom input → User selects theme or types words → Validates input (custom only) → Generates puzzle → Shows game board
- **Success criteria**: 12 themed categories with descriptive icons, minimum 3 words accepted for custom, maximum 15 words, words between 3-12 characters, displays helpful validation messages, smooth tab switching between themed and custom modes, "View Leaderboard" button visible on input screen

### Timer & Performance Tracking
- **Functionality**: Track the time from when puzzle is generated to when all words are found
- **Purpose**: Add competitive element and measure player performance
- **Trigger**: Automatically starts when puzzle is generated
- **Progression**: Puzzle generated → Timer starts at 00:00 → Updates every second → Stops when final word is found → Time displayed in completion dialog
- **Success criteria**: Timer displayed prominently during gameplay, accurate time tracking in MM:SS format, timer stops when puzzle completes, time saved to leaderboard entry

### Leaderboard System
- **Functionality**: Display sortable list of completed puzzle scores with player name, completion time, and word count
- **Purpose**: Provide competitive motivation and track player achievements across sessions
- **Trigger**: Accessible from input screen via "View Leaderboard" button, score automatically saved after puzzle completion
- **Progression**: Complete puzzle → Enter name in dialog → Save to leaderboard → View all scores sorted by time/name/word count
- **Success criteria**: Persistent storage using useKV, sortable by name/time/word count in ascending/descending order, smooth animations when sorting, displays empty state when no scores exist, back button to return to input screen

### Puzzle Grid Generation
- **Functionality**: Generate a grid (12x12 to 15x15) with user words placed in 8 directions (horizontal, vertical, diagonal - all forwards and backwards), fill remaining cells with random letters
- **Purpose**: Create the core gameplay experience with appropriate difficulty
- **Trigger**: User submits valid word list
- **Progression**: Receive word list → Calculate grid size → Place words with collision detection → Fill empty cells → Render interactive grid
- **Success criteria**: All words fit without overlap conflicts, random letters don't accidentally form user words, grid is consistently sized and readable

### Word Selection Mechanism
- **Functionality**: Click and drag to select letters in any of the 8 directions, highlight selected path
- **Purpose**: Primary interaction for finding words
- **Trigger**: Mouse down on any letter in the grid
- **Progression**: Mouse down on letter → Visual highlight follows mouse → Mouse up → Check if selection matches word → Mark as found or clear selection
- **Success criteria**: Smooth visual feedback during drag, only allows straight-line selections in valid directions, correctly identifies found words regardless of direction

### Word Bank Display
- **Functionality**: Show list of all words to find with visual indication of which are found
- **Purpose**: Guide the player and track progress
- **Trigger**: Displays when puzzle is generated
- **Progression**: Shows all words in readable list → Updates styling when word is found → All words crossed off signals completion
- **Success criteria**: Clear visual distinction between found/unfound words, responsive layout beside or below grid

### Puzzle Completion & Reset
- **Functionality**: Detect when all words are found, stop timer, celebrate completion, prompt for player name, save to leaderboard, offer to create new puzzle
- **Purpose**: Provide closure and encourage continued play while tracking achievements
- **Trigger**: Last word is found
- **Progression**: Final word found → Timer stops → Completion dialog appears → User enters name → Score saved to leaderboard → "Create New Puzzle" button returns to input
- **Success criteria**: Clear completion feedback with confetti or celebration animation, timer stops automatically, name input form with validation, successful save confirmation, smooth transition back to input state, option to skip leaderboard entry

## Edge Case Handling
- **Word validation**: Reject words with numbers, special characters, or excessive length; provide helpful error messages
- **Grid size limits**: If words are too long or too numerous, prompt user to reduce word count or length
- **Impossible placements**: Retry algorithm with different orientations if words can't fit; limit retry attempts
- **Accidental selections**: Allow users to deselect by clicking elsewhere or starting a new selection
- **Mobile touch**: Support touch events in addition to mouse for drag interactions
- **Empty input**: Require at least 3 words before generating puzzle

## Design Direction
The design should evoke the joy of completing a puzzle book page - colorful, energetic, and rewarding. Bright accent colors pop against a clean background, with generous spacing that makes the grid easy to scan. Interactive elements feel responsive and playful, with smooth animations that celebrate discoveries without interrupting flow.

## Color Selection
A vibrant puzzle book aesthetic with high energy and clear contrast.

- **Primary Color**: Rich purple `oklch(0.55 0.22 290)` - Represents the main brand identity and primary actions, evokes creativity and playfulness
- **Secondary Colors**: 
  - Soft lavender `oklch(0.85 0.08 290)` for subtle backgrounds and muted elements
  - Deep plum `oklch(0.35 0.18 290)` for text and stronger emphasis
- **Accent Color**: Electric coral `oklch(0.72 0.19 25)` - High-energy highlight for found words, completion states, and interactive feedback
- **Foreground/Background Pairings**: 
  - Background (Soft cream #FFFEF9 / oklch(0.99 0.01 85)): Deep plum text (oklch(0.35 0.18 290)) - Ratio 10.2:1 ✓
  - Primary (Rich purple oklch(0.55 0.22 290)): White text (oklch(1 0 0)) - Ratio 6.1:1 ✓
  - Accent (Electric coral oklch(0.72 0.19 25)): Deep plum text (oklch(0.35 0.18 290)) - Ratio 4.8:1 ✓
  - Grid cells (White oklch(1 0 0)): Deep plum text (oklch(0.35 0.18 290)) - Ratio 12.5:1 ✓

## Font Selection
Typography should feel approachable and geometric with a touch of playfulness that matches the puzzle aesthetic.

- **Typographic Hierarchy**: 
  - H1 (App Title): Fredoka Bold/32px/tight tracking - Rounded, friendly display font
  - H2 (Section Headers): Fredoka SemiBold/24px/normal tracking
  - Body (Instructions, Word Bank): Inter Medium/16px/relaxed line height - Clean, readable
  - Grid Letters: Fredoka Bold/20px/centered - Bold and clear for easy scanning
  - Buttons: Inter SemiBold/14px/uppercase/wide tracking

## Animations
Animations should celebrate discoveries and guide attention without slowing gameplay.

Key moments for animation:
- **Word selection**: Smooth color transition as letters highlight during drag (150ms ease-out)
- **Word found**: Celebratory scale pulse (200ms) and color shift to accent when valid word detected
- **Completion**: Confetti or sparkle effect when final word is found (500ms)
- **Transitions**: Smooth fade between word input and puzzle grid states (300ms)
- **Button hovers**: Subtle lift and shadow increase (150ms ease-out)

## Component Selection
- **Components**: 
  - `Button` (Primary actions - "Generate Puzzle", "Create New Puzzle", "Save to Leaderboard", "View Leaderboard") - Use variant="default" with custom purple primary color
  - `Card` (Grid container, word bank container, input form, timer display, leaderboard container) - Elevated with subtle shadows for depth
  - `Input` (Name entry for leaderboard) - Clean single-line input
  - `Textarea` (Word entry) - Large, clear with placeholder text
  - `Badge` (Individual words in word bank) - Custom styling for found/unfound states
  - `Separator` (Between grid and word bank on mobile)
  - `Alert` (Validation errors) - Destructive variant for input errors
  - `Dialog` (Completion celebration with name input) - Modal with celebration animation
  - `Tabs` (Theme selection vs custom input) - Smooth switching between modes
  
- **Customizations**: 
  - Custom grid component: CSS Grid with square cells, hover states, selection highlighting
  - Found word overlay: Colored stroke or highlight that persists on found words
  - Drag selection visual: Semi-transparent colored path that follows cursor
  - Timer component: Real-time display with icon and formatted time (MM:SS)
  - Leaderboard component: Sortable list with animated transitions, rank display
  
- **States**: 
  - Grid cells: Default (white), Hover (subtle scale), Selecting (highlighted purple/coral), Found (accent color with strikethrough or overlay)
  - Word bank items: Unfound (muted), Found (strikethrough + accent color)
  - Buttons: Default, Hover (lift + shadow), Active (pressed down), Disabled (grayed)
  - Sort buttons: Outline when inactive, solid primary when active, with directional caret icons
  - Timer: Running (updating), Stopped (final time display)
  
- **Icon Selection**: 
  - `Plus` for "Create New Puzzle" and "Generate Puzzle"
  - `Check` for completion state
  - `ArrowCounterClockwise` for reset/new puzzle
  - `Trophy` for leaderboard and score saving
  - `Timer` for time display
  - `User` for player name sorting
  - `Hash` for word count display/sorting
  - `CaretUp` / `CaretDown` for sort direction indicators
  
- **Spacing**: 
  - Grid cells: `gap-1` between cells
  - Container padding: `p-6` on cards
  - Section spacing: `space-y-6` between major sections
  - Word bank: `gap-2` for badge grid
  - Leaderboard entries: `space-y-2` between rows
  
- **Mobile**: 
  - Stack grid above word bank vertically on mobile (`flex-col`)
  - Reduce grid cell size for smaller screens (responsive font sizing)
  - Full-width buttons on mobile
  - Touch-friendly cell sizing (minimum 44px tap targets)
  - Timer and buttons stack on mobile for better fit
  - Leaderboard scrollable on small screens
