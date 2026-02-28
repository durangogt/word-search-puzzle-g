import { useState, useCallback, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlacedWord, checkSelection } from '@/lib/wordSearchGenerator';
import { motion } from 'framer-motion';

interface Cell {
  row: number;
  col: number;
}

interface WordSearchGridProps {
  grid: string[][];
  placedWords: PlacedWord[];
  onWordFound: (word: string) => void;
  foundWords: Set<string>;
}

function computeLinearSelection(start: Cell, end: Cell): Cell[] | null {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  const isHorizontal = rowDiff === 0 && colDiff !== 0;
  const isVertical = colDiff === 0 && rowDiff !== 0;
  const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0;

  if (!isHorizontal && !isVertical && !isDiagonal) return null;

  const cells: Cell[] = [start];
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

  for (let i = 1; i <= steps; i++) {
    cells.push({
      row: start.row + i * rowStep,
      col: start.col + i * colStep,
    });
  }
  return cells;
}

export function WordSearchGrid({ grid, placedWords, onWordFound, foundWords }: WordSearchGridProps) {
  const [selecting, setSelecting] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<Cell[]>([]);
  const [foundPositions, setFoundPositions] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

  // Keep a ref that always holds the latest state so native event handlers
  // (added via useEffect) never read stale values from a closure.
  const stateRef = useRef({ selecting, currentSelection, foundWords, foundPositions });
  stateRef.current = { selecting, currentSelection, foundWords, foundPositions };

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const isCellSelected = useCallback((row: number, col: number) => {
    return currentSelection.some(cell => cell.row === row && cell.col === col);
  }, [currentSelection]);

  const isCellFound = useCallback((row: number, col: number) => {
    return foundPositions.has(getCellKey(row, col));
  }, [foundPositions]);

  const handleMouseDown = (row: number, col: number) => {
    setSelecting(true);
    setCurrentSelection([{ row, col }]);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!selecting) return;

    if (currentSelection.length === 0) {
      setCurrentSelection([{ row, col }]);
      return;
    }

    const newSelection = computeLinearSelection(currentSelection[0], { row, col });
    if (newSelection) setCurrentSelection(newSelection);
  };

  // Shared finalization logic used by both mouse and touch paths.
  const finalizeSelection = useCallback(() => {
    const { selecting, currentSelection, foundWords, foundPositions } = stateRef.current;
    if (!selecting) return;

    const foundWord = checkSelection(currentSelection, placedWords);

    if (foundWord && !foundWords.has(foundWord.word)) {
      const newFoundPositions = new Set(foundPositions);
      foundWord.positions.forEach(pos => {
        newFoundPositions.add(getCellKey(pos.row, pos.col));
      });
      setFoundPositions(newFoundPositions);
      onWordFound(foundWord.word);
    }

    setSelecting(false);
    setCurrentSelection([]);
  }, [placedWords, onWordFound]);

  // Global mouseup so dragging outside the grid still finalizes the selection.
  useEffect(() => {
    document.addEventListener('mouseup', finalizeSelection);
    return () => document.removeEventListener('mouseup', finalizeSelection);
  }, [finalizeSelection]);

  // Touch support: register non-passive listeners on the grid container so we
  // can call preventDefault() and prevent the page from scrolling while the
  // user is dragging to select a word.
  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const getCellFromPoint = (x: number, y: number): Cell | null => {
      const el = document.elementFromPoint(x, y);
      if (!el) return null;
      const cellEl = (el as HTMLElement).closest('[data-cell]') as HTMLElement | null;
      if (!cellEl) return null;
      const row = parseInt(cellEl.dataset.row ?? '-1', 10);
      const col = parseInt(cellEl.dataset.col ?? '-1', 10);
      return row >= 0 && col >= 0 ? { row, col } : null;
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const cell = getCellFromPoint(touch.clientX, touch.clientY);
      if (!cell) return;
      e.preventDefault();
      setSelecting(true);
      setCurrentSelection([cell]);
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!stateRef.current.selecting) return;
      const touch = e.touches[0];
      const cell = getCellFromPoint(touch.clientX, touch.clientY);
      if (!cell) return;
      setCurrentSelection(prev => {
        if (prev.length === 0) return [cell];
        const newSelection = computeLinearSelection(prev[0], cell);
        return newSelection ?? prev;
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      finalizeSelection();
    };

    gridEl.addEventListener('touchstart', onTouchStart, { passive: false });
    gridEl.addEventListener('touchmove', onTouchMove, { passive: false });
    gridEl.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      gridEl.removeEventListener('touchstart', onTouchStart);
      gridEl.removeEventListener('touchmove', onTouchMove);
      gridEl.removeEventListener('touchend', onTouchEnd);
    };
  }, [finalizeSelection]);

  const cellSize = grid.length > 15 ? 'sm' : grid.length > 12 ? 'md' : 'lg';
  const cellSizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <Card className="p-4 md:p-6 select-none">
      <div
        ref={gridRef}
        className="inline-grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const isSelected = isCellSelected(rowIndex, colIndex);
            const isFound = isCellFound(rowIndex, colIndex);

            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                data-cell
                data-row={rowIndex}
                data-col={colIndex}
                className={cn(
                  'flex items-center justify-center font-bold rounded-md cursor-pointer transition-all duration-150',
                  cellSizeClasses[cellSize],
                  isFound && 'bg-accent text-accent-foreground',
                  !isFound && 'bg-card hover:bg-secondary/50',
                  isSelected && !isFound && 'bg-primary text-primary-foreground'
                )}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isFound ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                {letter}
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
}
