import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  CaretUp, 
  CaretDown, 
  User, 
  Timer as TimerIcon, 
  Hash 
} from '@phosphor-icons/react';
import { useKV } from '@github/spark/hooks';
import { motion, AnimatePresence } from 'framer-motion';

export interface LeaderboardEntry {
  id: string;
  name: string;
  time: number;
  wordCount: number;
  timestamp: number;
}

type SortField = 'name' | 'time' | 'wordCount';
type SortDirection = 'asc' | 'desc';

export function Leaderboard() {
  const [entries] = useKV<LeaderboardEntry[]>('leaderboard-entries', []);
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedEntries = [...(entries || [])].sort((a, b) => {
    let compareValue = 0;
    
    switch (sortField) {
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'time':
        compareValue = a.time - b.time;
        break;
      case 'wordCount':
        compareValue = a.wordCount - b.wordCount;
        break;
    }
    
    return sortDirection === 'asc' ? compareValue : -compareValue;
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const SortButton = ({ field, label, icon }: { field: SortField; label: string; icon: React.ReactNode }) => {
    const isActive = sortField === field;
    return (
      <Button
        variant={isActive ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleSort(field)}
        className="flex items-center gap-2 font-semibold"
      >
        {icon}
        {label}
        {isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            {sortDirection === 'asc' ? (
              <CaretUp weight="bold" />
            ) : (
              <CaretDown weight="bold" />
            )}
          </motion.span>
        )}
      </Button>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy size={28} weight="fill" className="text-accent" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <SortButton field="name" label="Name" icon={<User size={16} />} />
        <SortButton field="time" label="Time" icon={<TimerIcon size={16} />} />
        <SortButton field="wordCount" label="Words" icon={<Hash size={16} />} />
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {sortedEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-muted-foreground"
            >
              <Trophy size={48} className="mx-auto mb-3 opacity-30" />
              <p>No scores yet. Complete a puzzle to get on the board!</p>
            </motion.div>
          ) : (
            sortedEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex-shrink-0 w-8 text-center font-bold text-primary font-display text-lg">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground truncate">
                    {entry.name}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                  <TimerIcon size={16} />
                  <span>{formatTime(entry.time)}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Hash size={16} />
                  <span>{entry.wordCount}</span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
