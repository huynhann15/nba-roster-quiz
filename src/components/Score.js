import React from "react";

export default function Score({ correct, total }) {
  return (
    <div className="score">
      <h2>Score</h2>
      <p>
        Correct guesses: <strong>{correct}</strong> / {total}
      </p>
    </div>
  );
}

