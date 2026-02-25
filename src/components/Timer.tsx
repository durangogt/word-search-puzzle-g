import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from '@phospho
import { Timer as TimerIcon } from '@phosphor-icons/react';


  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);


    if (!isRunning) return;

    const startTime = Date.now() - time * 1000;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      </span>
      onTimeUpdate(elapsed);


    return () => clearInterval(interval);
  }, [isRunning, time, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="px-4 py-3 flex items-center gap-3">
      <TimerIcon size={24} className="text-primary" />
      <span className="text-lg font-semibold font-mono text-foreground">
        {formatTime(time)}

    </Card>

}
