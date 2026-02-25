export type Direction = 'E' | 'W' | 'N' | 'S' | 'NE' | 'NW' | 'SE' | 'SW';

export interface PlacedWord {
  word: string;
  startRow: number;
  startCol: number;
  direction: Direction;
  positions: Array<{ row: number; col: number }>;
}

export interface WordSearchPuzzle {
  grid: string[][];
  size: number;
  placedWords: PlacedWord[];
}

const DIRECTIONS: Direction[] = ['E', 'W', 'N', 'S', 'NE', 'NW', 'SE', 'SW'];

const DIRECTION_VECTORS: Record<Direction, [number, number]> = {
  E: [0, 1],
  W: [0, -1],
  N: [-1, 0],
  S: [1, 0],
  NE: [-1, 1],
  NW: [-1, -1],
  SE: [1, 1],
  SW: [1, -1],
};

function calculateGridSize(words: string[]): number {
  const maxWordLength = Math.max(...words.map(w => w.length));
  const wordCount = words.length;
  const baseSize = Math.max(maxWordLength + 2, 12);
  const sizeForWords = Math.ceil(Math.sqrt(wordCount * maxWordLength * 2));
  return Math.min(20, Math.max(baseSize, sizeForWords));
}

function canPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): boolean {
  const [dRow, dCol] = DIRECTION_VECTORS[direction];
  const size = grid.length;

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dRow;
    const newCol = col + i * dCol;

    if (newRow < 0 || newRow >= size || newCol < 0 || newCol >= size) {
      return false;
    }

    const cellValue = grid[newRow][newCol];
    if (cellValue !== '' && cellValue !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: Direction
): Array<{ row: number; col: number }> {
  const [dRow, dCol] = DIRECTION_VECTORS[direction];
  const positions: Array<{ row: number; col: number }> = [];

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dRow;
    const newCol = col + i * dCol;
    grid[newRow][newCol] = word[i];
    positions.push({ row: newRow, col: newCol });
  }

  return positions;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateWordSearch(words: string[]): WordSearchPuzzle {
  const upperWords = words.map(w => w.toUpperCase());
  const size = calculateGridSize(upperWords);
  const grid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
  const placedWords: PlacedWord[] = [];

  const sortedWords = [...upperWords].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    const attempts = 100;
    const shuffledDirections = shuffleArray(DIRECTIONS);

    for (let attempt = 0; attempt < attempts && !placed; attempt++) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      for (const direction of shuffledDirections) {
        if (canPlaceWord(grid, word, row, col, direction)) {
          const positions = placeWord(grid, word, row, col, direction);
          placedWords.push({
            word,
            startRow: row,
            startCol: col,
            direction,
            positions,
          });
          placed = true;
          break;
        }
      }
    }

    if (!placed) {
      throw new Error(`Could not place word: ${word}. Try fewer or shorter words.`);
    }
  }

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  return { grid, size, placedWords };
}

export function checkSelection(
  selection: Array<{ row: number; col: number }>,
  placedWords: PlacedWord[]
): PlacedWord | null {
  if (selection.length < 2) return null;

  for (const placedWord of placedWords) {
    if (selection.length !== placedWord.positions.length) continue;

    const forward = placedWord.positions.every((pos, idx) =>
      pos.row === selection[idx].row && pos.col === selection[idx].col
    );

    const backward = placedWord.positions.every((pos, idx) =>
      pos.row === selection[selection.length - 1 - idx].row &&
      pos.col === selection[selection.length - 1 - idx].col
    );

    if (forward || backward) {
      return placedWord;
    }
  }

  return null;
}
