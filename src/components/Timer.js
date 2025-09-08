import React, { useEffect, useState } from "react";

const INTERVAL = 100; // update every 0.1s

export const Timer = ({ duration, onTimeEnd, paused, stopped }) => {
  const [time, setTime] = useState(duration === "infinite" ? 0 : duration);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  useEffect(() => {
    const isInfinite = duration === "infinite";
    if (stopped) return;

    const intervalId = setInterval(() => {
      if (paused) return;

      setTime((prevTime) => {
        const now = Date.now();
        const delta = now - referenceTime;
        setReferenceTime(now);

        if (isInfinite) {
          return prevTime + delta;
        } else {
          if (prevTime - delta <= 0) {
            clearInterval(intervalId);
            if (onTimeEnd) onTimeEnd();
            return 0;
          }
          return prevTime - delta;
        }
      });
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [duration, referenceTime, paused, stopped, onTimeEnd]);

  // minutes:seconds formatting
  const totalSeconds = Math.ceil(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return <span>{minutes}:{formattedSeconds}</span>;
};

