import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Plus, Trophy } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from 'sonner';
import type { LeaderboardEntry } from './Leaderboard';

interface CompletionDialogProps {
  open: boolean;
  onNewPuzzle: () => void;
  completionTime: number;
  wordCount: number;
}

export function CompletionDialog({ 
  open, 
  onNewPuzzle, 
  completionTime, 
  wordCount 
}: CompletionDialogProps) {
  const [name, setName] = useState('');
  const [entries, setEntries] = useLocalStorage<LeaderboardEntry[]>('leaderboard-entries', []);
  const [saved, setSaved] = useState(false);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveScore = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random()}`,
      name: name.trim(),
      time: completionTime,
      wordCount,
      timestamp: Date.now(),
    };

    setEntries((currentEntries) => [...(currentEntries || []), newEntry]);
    setSaved(true);
    toast.success('Score saved to leaderboard!');
  };

  const handleNewPuzzle = () => {
    setName('');
    setSaved(false);
    onNewPuzzle();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="mx-auto mb-4"
          >
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <Check size={40} weight="bold" className="text-accent-foreground" />
            </div>
          </motion.div>
          <DialogTitle className="text-center text-2xl">
            Puzzle Complete!
          </DialogTitle>
          <DialogDescription className="text-center">
            You found all {wordCount} words in {formatTime(completionTime)}
          </DialogDescription>
        </DialogHeader>

        {!saved ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="player-name">Enter your name for the leaderboard</Label>
              <Input
                id="player-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveScore();
                  }
                }}
                className="text-base"
                maxLength={30}
              />
            </div>
            <Button
              onClick={handleSaveScore}
              size="lg"
              className="w-full text-base font-semibold uppercase tracking-wide"
            >
              <Trophy className="mr-2" />
              Save to Leaderboard
            </Button>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-muted-foreground mb-4">
              Your score has been saved!
            </p>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleNewPuzzle}
            variant={saved ? 'default' : 'outline'}
            size="lg"
            className="w-full sm:w-auto text-base font-semibold uppercase tracking-wide"
          >
            <Plus className="mr-2" />
            Create New Puzzle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
