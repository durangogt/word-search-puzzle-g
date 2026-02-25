import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from '@phosphor-icons/react';
import { Card } from '@/components/ui/card';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setTime(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed);
      onTimeUpdate?.(elapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4 flex items-center gap-3">
      <TimerIcon size={24} className="text-primary" weight="bold" />
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
          Time
        </div>
        <div className="text-2xl font-bold text-foreground font-display">
          {formatTime(time)}
        </div>
      </div>
    </Card>
  );
}
