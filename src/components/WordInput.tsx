import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus } from '@phosphor-icons/react';

interface WordInputProps {
  onGenerate: (words: string[]) => void;
}

export function WordInput({ onGenerate }: WordInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = () => {
    setError('');

    const rawWords = input
      .split(/[\n,]+/)
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length > 0);

    if (rawWords.length < 3) {
      setError('Please enter at least 3 words.');
      return;
    }

    if (rawWords.length > 15) {
      setError('Please enter no more than 15 words.');
      return;
    }

    const invalidWords = rawWords.filter(w => w.length < 3 || w.length > 12);
    if (invalidWords.length > 0) {
      setError('All words must be between 3 and 12 characters long.');
      return;
    }

    const nonAlpha = rawWords.filter(w => !/^[A-Z]+$/.test(w));
    if (nonAlpha.length > 0) {
      setError('Words can only contain letters (no numbers or special characters).');
      return;
    }

    onGenerate(rawWords);
  };

  return (
    <Card className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Word Search Game
        </h1>
        <p className="text-muted-foreground">
          Enter your words to create a custom puzzle
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="word-input" className="block text-sm font-medium mb-2">
            Enter words (separated by commas or new lines)
          </label>
          <Textarea
            id="word-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="puzzle, game, word, search, find, hidden, letters, grid, fun, challenge"
            rows={6}
            className="resize-none text-base"
          />
          <p className="text-xs text-muted-foreground mt-2">
            • 3-15 words • 3-12 characters each • Letters only
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleGenerate}
          className="w-full text-base font-semibold uppercase tracking-wide"
          size="lg"
        >
          <Plus className="mr-2" />
          Generate Puzzle
        </Button>
      </div>
    </Card>
  );
}
