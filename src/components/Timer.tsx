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

    const startTime = Date.now() - time * 1000;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed);
      onTimeUpdate?.(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="px-6 py-3 bg-card flex items-center gap-3">
      <TimerIcon size={24} className="text-primary" />
      <span className="text-2xl font-bold font-mono text-foreground">
        {formatTime(time)}
      </span>
    </Card>
  );
}
