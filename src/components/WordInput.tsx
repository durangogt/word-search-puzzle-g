import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sparkle } from '@phosphor-icons/react';
import { wordThemes } from '@/lib/wordThemes';
import { motion } from 'framer-motion';

interface WordInputProps {
  onGenerate: (words: string[]) => void;
}

export function WordInput({ onGenerate }: WordInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('themes');

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

  const handleThemeSelect = (words: string[]) => {
    onGenerate(words);
  };

  return (
    <Card className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Word Search Game
        </h1>
        <p className="text-muted-foreground">
          Choose a theme or create your own custom puzzle
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="themes" className="font-semibold">
            <Sparkle className="mr-2" />
            Themed Puzzles
          </TabsTrigger>
          <TabsTrigger value="custom" className="font-semibold">
            <Plus className="mr-2" />
            Custom Words
          </TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {wordThemes.map((theme, index) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Button
                  onClick={() => handleThemeSelect(theme.words)}
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                >
                  <span className="text-3xl">{theme.icon}</span>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{theme.name}</div>
                    <div className="text-xs opacity-70 mt-1">{theme.description}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-0">
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
        </TabsContent>
      </Tabs>
    </Card>
  );
}
