import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Plus } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface CompletionDialogProps {
  open: boolean;
  onNewPuzzle: () => void;
}

export function CompletionDialog({ open, onNewPuzzle }: CompletionDialogProps) {
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
            Congratulations! You found all the words.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={onNewPuzzle}
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
