import React, { useState } from "react";
import "./App.css";
import teams from "./data/24-25roster.json";

import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState("infinite"); // null creates error

const handleGuess = (e) => {
  e.preventDefault();
  if (!selectedTeam || !input) return;

  const guess = input.trim().toLowerCase();

  const allPlayers =
    selectedTeam === "all"
      ? teams.flatMap((t) => t.players)
      : selectedTeam.players;

  const matches = allPlayers.filter((p) => {
    const lastName = p.playerName.split(" ").slice(-1)[0].toLowerCase();
    return lastName === guess;
  });

  if (matches.length > 0) {
    // adds players not guessed yet
    const newCorrect = matches
      .map((p) => p.playerName)
      .filter((name) => !correct.includes(name));

    if (newCorrect.length > 0) {
      setCorrect([...correct, ...newCorrect]);
    }
  }
  setInput("");
};

  if (!started && !selectedTeam) {
    return (
      <div className="App">
        <StartScreen
          teams={teams}
          setSelectedTeam={setSelectedTeam}
          startQuiz={() => setStarted(true)}
          setDuration={setDuration}
        />
      </div>
    );
  }

  if (ended) {
    return (
      <div className="App">
        <ResultsScreen team={selectedTeam} correct={correct} teams={teams} />
      </div>
    );
  }

  return (
    <div className="App">
      <Quiz
        selectedTeam={selectedTeam}
        correct={correct}
        input={input}
        setInput={setInput}
        handleGuess={handleGuess}
        setEnded={setEnded}
        duration={duration}
        teams={teams}
      />
    </div>
  );
}

export default App;

