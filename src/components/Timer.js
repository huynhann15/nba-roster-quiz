import React, { useEffect, useState, useRef } from "react";

const INTERVAL = 100;

export default function Timer({ duration, onTimeEnd, paused, stopped, onTimeUpdate }) {
  const [time, setTime] = useState(duration === "infinite" ? 0 : duration);
  const referenceTimeRef = useRef(Date.now());

  // Update reference time when pause toggles
  useEffect(() => {
    if (!paused) {
      referenceTimeRef.current = Date.now();
    }
  }, [paused]);

  useEffect(() => {
    if (stopped) return;

    const isInfinite = duration === "infinite";

    const intervalId = setInterval(() => {
      if (paused) return;

      setTime(prevTime => {
        const now = Date.now();
        const delta = now - referenceTimeRef.current;
        referenceTimeRef.current = now;

        let newTime;
        if (isInfinite) {
          newTime = prevTime + delta;
        } else {
          newTime = prevTime - delta <= 0 ? 0 : prevTime - delta;
          if (newTime === 0 && onTimeEnd) {
            clearInterval(intervalId);
            onTimeEnd();
          }
        }

        if (onTimeUpdate) onTimeUpdate(newTime);

        return newTime;
      });
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, [duration, paused, stopped, onTimeEnd, onTimeUpdate]);


  const totalSeconds = Math.ceil(time / 1000);
  const pad = n => (n < 10 ? `0${n}` : n);

  if (duration === "infinite") {
    //hh:mm:ss
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return <span>{hours}:{pad(minutes)}:{pad(seconds)}</span>;
  } else {
    //mm:ss
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return <span>{minutes}:{pad(seconds)}</span>;
  }
}

