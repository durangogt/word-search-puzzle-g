import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from '@phosphor-icons/react';
interface TimerProps {

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);


    if (!isRunning) {
      setTime(0);
      return;
    }

      <TimerIcon size={24} classN
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


  return (
    <Card className="p-4 flex items-center gap-3">












