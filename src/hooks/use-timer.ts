import { useCallback, useEffect, useRef, useState } from "react";

export type TimerHookProps = {
  seconds: number;
  countDown?: boolean;
  onFinish?: () => void;
};

export const useTimer = ({
  seconds,
  countDown = true,
  onFinish,
}: TimerHookProps) => {
  const [time, setTime] = useState("");
  const [timePassedInPercent, setTimePassedInPercent] = useState(100);
  const [isActive, setIsActive] = useState(false);

  const intervalRef = useRef(0);
  const date = useRef(Date.now() + (seconds + 1) * 1000);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(true);

    date.current = Date.now() + (seconds + 1) * 1000;
  }, [seconds]);

  useEffect(() => {
    if (isActive) {
      const interval = () => {
        if (countDown) {
          const timePassed = date.current - Date.now();

          setTimePassedInPercent(
            Math.ceil((timePassed / 1000 / (seconds + 1)) * 100)
          );

          if (timePassed <= 0) {
            clearInterval(intervalRef.current);

            onFinish && onFinish();

            return;
          }

          const minutesLeft = Math.floor(timePassed / 1000 / 60);
          const secondsLeft = Math.floor((timePassed / 1000) % 60);

          setTime(
            `${minutesLeft <= 9 ? `0${minutesLeft}` : minutesLeft}:${
              secondsLeft <= 9 ? `0${secondsLeft}` : secondsLeft
            }`
          );
        }
      };

      intervalRef.current = setInterval(interval, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [countDown, isActive, onFinish, seconds]);

  return {
    time,
    start,
    stop,
    reset,
    timePassedInPercent,
  };
};
