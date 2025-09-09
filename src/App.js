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

const handleGuess = (e, overrideGuess) => {
  if(e && typeof e.preventDefault === "function") e.preventDefault();
  if (!selectedTeam) return;
  
  //in case of stale input
  const guess = (overrideGuess ?? input).trim().toLowerCase();
  if (!guess) return;

  const allPlayers =
    selectedTeam === "all"
      ? teams.flatMap((t) => t.players)
      : selectedTeam.players || [];

  const matches = allPlayers.filter((p) => {
    const fullName = p.playerName.split(" ");
    const parts = p.playerName.split(" ");
    const lastName = parts[parts.length - 1].toLowerCase();
    return fullName === guess || lastName === guess;
  });

  if (matches.length > 0) {
    const newCorrect = [
      ...new Set([
        ...correct,
        ...matches.map((p) => p.playerName),
      ]),
    ];
    setCorrect(newCorrect);
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

