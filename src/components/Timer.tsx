import { useEffect, useState } from 'react';
import { Timer as TimerIcon } from '@phosphor-icons/react';


  onTimeUpdate?: (time
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
 


      const elapsed = Math.floor((Date


  }, [isRunning, onTimeUpdate]);
  const formatTime = 
    const secs = 
  };
  ret

        {formatTime(time)}
    </Card>
}
















        {formatTime(time)}
      </span>
    </Card>
  );
}
