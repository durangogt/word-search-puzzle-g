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

export function WordSearchGrid({ grid, placedWords, onWordFound, foundWords }: WordSearchGridProps) {
  const [selecting, setSelecting] = useState(false);
  const [currentSelection, setCurrentSelection] = useState<Cell[]>([]);
  const [foundPositions, setFoundPositions] = useState<Set<string>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);

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

    const start = currentSelection[0];
    const rowDiff = row - start.row;
    const colDiff = col - start.col;

    const isHorizontal = rowDiff === 0 && colDiff !== 0;
    const isVertical = colDiff === 0 && rowDiff !== 0;
    const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff) && rowDiff !== 0;

    if (!isHorizontal && !isVertical && !isDiagonal) {
      return;
    }

    const newSelection: Cell[] = [start];
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    for (let i = 1; i <= steps; i++) {
      newSelection.push({
        row: start.row + i * rowStep,
        col: start.col + i * colStep,
      });
    }

    setCurrentSelection(newSelection);
  };

  const handleMouseUp = () => {
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
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (selecting) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [selecting, currentSelection, foundWords]);

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
                className={cn(
                  'flex items-center justify-center font-bold rounded-md cursor-pointer transition-all duration-150',
                  cellSizeClasses[cellSize],
                  isFound && 'bg-accent text-accent-foreground',
                  !isFound && 'bg-card hover:bg-secondary/50',
                  isSelected && !isFound && 'bg-primary text-primary-foreground'
                )}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onTouchStart={() => handleMouseDown(rowIndex, colIndex)}
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
