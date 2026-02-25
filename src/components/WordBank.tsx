import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface WordBankProps {
  words: string[];
  foundWords: Set<string>;
}

export function WordBank({ words, foundWords }: WordBankProps) {
  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
        Word Bank
      </h2>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => {
          const isFound = foundWords.has(word);
          return (
            <motion.div
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant={isFound ? 'default' : 'secondary'}
                className={cn(
                  'text-sm md:text-base px-3 py-1.5 transition-all duration-200',
                  isFound && 'line-through bg-accent text-accent-foreground'
                )}
              >
                {word}
              </Badge>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        {foundWords.size} of {words.length} found
      </div>
    </Card>
  );
}
