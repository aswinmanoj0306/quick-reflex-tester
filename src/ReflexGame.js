import React, { useState, useEffect } from 'react';

function ReflexGame() {
  const [showShape, setShowShape] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('bestTime');
    return saved ? parseFloat(saved) : null;
  });

  const randomDelay = () => Math.floor(Math.random() * 3000) + 1000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShape(true);
      setStartTime(Date.now());
    }, randomDelay());

    return () => clearTimeout(timer);
  }, [reactionTime]);

  const handleClick = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    setReactionTime(timeTaken.toFixed(3));
    setShowShape(false);

    if (!bestTime || timeTaken < bestTime) {
      setBestTime(timeTaken.toFixed(3));
      localStorage.setItem('bestTime', timeTaken.toFixed(3));
    }
  };

  const resetGame = () => {
    setReactionTime(null);
    setShowShape(false);
    setStartTime(null);
  };

  return (
    <div className="game-container">
      <div className="info">
        <p>Reaction Time: {reactionTime ? `${reactionTime} s` : '—'}</p>
        <p>Best Time: {bestTime ? `${bestTime} s` : '—'}</p>
      </div>
      <div className="game-area">
        {showShape && (
          <div className="shape" onClick={handleClick}></div>
        )}
        {!showShape && reactionTime && (
          <button className="reset-btn" onClick={resetGame}>Try Again</button>
        )}
      </div>
    </div>
  );
}

export default ReflexGame;
