import React, { useEffect, useState } from "react";

import "./SessionExpire.css";

export interface SessionExpireProps {
  end: number;
  round: number;
}
export const SessionExpire = (props) => {
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
    <div className="session-expire" key={remaining}>
      <div className="session-expire--text">{`Round #${props.round} Starting`}</div>
      <div className="session-expire--timer">{remaining}</div>
    </div>
  );
};

function computeRemaining(end: number) {
  return Math.abs(Math.floor(((new Date().getTime() - end) % 60000) / 1000));
}
