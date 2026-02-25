import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Timer as TimerIcon } from '@phosphor-icons/react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now() - time * 1000;
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
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="px-4 py-2 inline-flex items-center gap-2">
      <TimerIcon size={20} weight="bold" className="text-primary" />
      <span className="font-bold text-lg font-display tabular-nums">
        {formatTime(time)}
      </span>
    </Card>
  );
}
