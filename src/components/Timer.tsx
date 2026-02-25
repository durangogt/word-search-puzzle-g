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
    if (!isRunning) return;

    const startTime = Date.now() - time * 1000;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed);
      onTimeUpdate?.(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time, onTimeUpdate]);

  useEffect(() => {
    if (!isRunning) {
      setTime(0);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="px-4 py-3 flex items-center gap-3">
      <TimerIcon className="text-primary" weight="fill" />
      <span className="font-semibold text-lg font-mono tabular-nums">
        {formatTime(time)}
      </span>
    </Card>
  );
}
