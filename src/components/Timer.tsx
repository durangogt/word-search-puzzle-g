import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from '@phospho
import { Timer as TimerIcon } from '@phosphor-icons/react';

  onTimeUpdate?: (time
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [time, setTime] = useState(0);

      setTime(elaps
    if (!isRunning) return;

    const startTime = Date.now() - time * 1000;
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      </span>
  );
















      </span>
    </Card>
  );
}
