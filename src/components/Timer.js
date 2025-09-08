import React, { useEffect, useState } from "react";

const INTERVAL = 100; // update every 0.1s

export const Timer = ({ duration, onTimeEnd, paused = false, stopped = false }) => {
  
  const [time, setTime] = useState(() => {
    return duration === "infinite" ? 0 : duration;
  });
  const [referenceTime, setReferenceTime] = useState(Date.now());

  useEffect(() => {
    if(duration !=="infinite") return;


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
    
const pad = (n) => (n < 10 ? `0${n}` : n);
  //include hours for infinite
  if(duration === "infinte"){
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds /3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return <span>{pad(hours)}:{pad(minutes)}:{pad(seconds)}</span>;
  //minutes:seconds for set
  } else{
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return <span>{minutes}:{pad(seconds)}</span>;
  }
};

