import { useState, useEffect } from 'react';
import { WordInput } from '@/components/WordInput';
import { WordSearchGrid } from '@/components/WordSearchGrid';
import { WordBank } from '@/components/WordBank';
import { CompletionDialog } from '@/components/CompletionDialog';
import { Timer } from '@/components/Timer';
import { Leaderboard } from '@/components/Leaderboard';
import { generateWordSearch, type WordSearchPuzzle } from '@/lib/wordSearchGenerator';
import { toast, Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowCounterClockwise, Trophy } from '@phosphor-icons/react';

function App() {
  const [puzzle, setPuzzle] = useState<WordSearchPuzzle | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleGenerate = (inputWords: string[]) => {
    try {
      const newPuzzle = generateWordSearch(inputWords);
      setPuzzle(newPuzzle);
      setWords(inputWords);
      setFoundWords(new Set());
      setShowCompletion(false);
      setIsTimerRunning(true);
      setCompletionTime(0);
      setShowLeaderboard(false);
      toast.success('Puzzle generated! Start finding words.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate puzzle');
    }
  };

  const handleWordFound = (word: string) => {
    setFoundWords((prev) => {
      const newSet = new Set(prev);
      newSet.add(word);
      return newSet;
    });
    toast.success(`Found: ${word}`);
  };

  const handleNewPuzzle = () => {
    setPuzzle(null);
    setWords([]);
    setFoundWords(new Set());
    setShowCompletion(false);
    setIsTimerRunning(false);
    setCompletionTime(0);
    setShowLeaderboard(false);
  };

  const handleTimeUpdate = (time: number) => {
    setCompletionTime(time);
  };

  useEffect(() => {
    if (words.length > 0 && foundWords.size === words.length && !showCompletion) {
      setIsTimerRunning(false);
      setTimeout(() => {
        setShowCompletion(true);
      }, 500);
    }
  }, [foundWords, words.length, showCompletion]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-background py-8 px-4">
        <AnimatePresence mode="wait">
          {!puzzle && !showLeaderboard ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => setShowLeaderboard(true)}
                  variant="outline"
                  size="lg"
                  className="font-semibold uppercase tracking-wide"
                >
                  <Trophy className="mr-2" />
                  View Leaderboard
                </Button>
              </div>
              <WordInput onGenerate={handleGenerate} />
            </motion.div>
          ) : !puzzle && showLeaderboard ? (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-6">
                <Button
                  onClick={() => setShowLeaderboard(false)}
                  variant="outline"
                  className="font-semibold"
                >
                  ← Back
                </Button>
              </div>
              <Leaderboard />
            </motion.div>
          ) : (
            <motion.div
              key="puzzle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto"
            >
              <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Word Search Game
                </h1>
                <div className="flex items-center gap-3">
                  <Timer isRunning={isTimerRunning} onTimeUpdate={handleTimeUpdate} />
                  <Button
                    onClick={handleNewPuzzle}
                    variant="outline"
                    size="lg"
                    className="font-semibold uppercase tracking-wide"
                  >
                    <ArrowCounterClockwise className="mr-2" />
                    New Puzzle
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-6">
                {puzzle && (
                  <>
                    <WordSearchGrid
                      grid={puzzle.grid}
                      placedWords={puzzle.placedWords}
                      onWordFound={handleWordFound}
                      foundWords={foundWords}
                    />
                    <WordBank words={words} foundWords={foundWords} />
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CompletionDialog 
          open={showCompletion} 
          onNewPuzzle={handleNewPuzzle} 
          completionTime={completionTime}
          wordCount={words.length}
        />
      </div>
    </>
  );
}

export default App;