import React, { useEffect, useState } from "react";

import "./SessionPreshow.css";

export interface SessionPreshowProps {
  end: number;
  round: number;
}
export const SessionPreshow = (props) => {
  // Hooks //

  const [remaining, setRemaining] = useState(computeRemaining(props.end));

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemaining = computeRemaining(props.end);
      if (newRemaining !== remaining) {
        clearInterval(interval);
        setRemaining(newRemaining);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [props.end, remaining]);

  // Rendering //

  return (
    <div className="session-preshow" key={remaining}>
      <div className="session-preshow--text">{`Round #${props.round} Starting`}</div>
      <div className="session-preshow--timer">{remaining}</div>
    </div>
  );
};

function computeRemaining(end: number) {
  return Math.abs(Math.floor(((new Date().getTime() - end) % 60000) / 1000));
}
