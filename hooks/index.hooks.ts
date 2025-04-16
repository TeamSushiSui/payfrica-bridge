import { useState, useEffect, useRef } from "react";

type UseTimerReturn = {
  time: string;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
};

export const useTimer = (
  initialTime: number = 25 * 60 * 1000,
  start: boolean = false
): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(start);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((time % 60000) / 1000); // Get remaining seconds
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  const startTimer = (): void => setIsRunning(true);
  const pauseTimer = (): void => setIsRunning(false);
  const resetTimer = (): void => {
    clearInterval(intervalRef.current!);
    setTime(initialTime);
    setIsRunning(false);
  };

  return {
    time: formatTime(time),
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
