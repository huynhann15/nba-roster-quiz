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


  const totalSeconds = Math.ceil(time / 1000);
  if (duration === "infinite") {
    //hours added
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => (n < 10 ? `0${n}` : n);
    return <span>{hours}:{pad(minutes)}:{pad(seconds)}</span>;
  } else {
    // minutes:seconds for set
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => (n < 10 ? `0${n}` : n);
    return <span>{minutes}:{pad(seconds)}</span>;
  }
};

