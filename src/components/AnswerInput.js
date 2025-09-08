import React from "react";

export default function AnswerInput({ input, setInput, handleGuess, disabled }) {
  return (
    <form onSubmit={handleGuess} className="answer-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter player name"
        disabled={disabled}
        autoFocus
        autoComplete="off"
      />
      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
