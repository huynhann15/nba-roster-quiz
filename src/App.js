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
  const [duration, setDuration] = useState("infinite");

  const handleGuess = (e, overrideGuess) => {
    if (e?.preventDefault) e.preventDefault();
    if (!selectedTeam) return;

    const guess = (overrideGuess ?? input).trim().toLowerCase();
    if (!guess) return;

    const allPlayers =
      selectedTeam === "all"
        ? teams.flatMap((t) => t.players || [])
        : selectedTeam?.players || [];

    const matches = allPlayers.filter((p) => {
      const fullName = p.playerName.trim().toLowerCase();
      const parts = p.playerName.trim().split(" ");
      const lastName = parts[parts.length - 1].toLowerCase();
      return fullName === guess || lastName === guess;
    });

    if (matches.length > 0) {
      const newCorrect = [
        ...new Set([...correct, ...matches.map((p) => p.playerName)]),
      ];
      setCorrect(newCorrect);
    }
    setInput("");
  };

  const handleStartQuiz = (team) => {
    setSelectedTeam(team);
    setStarted(true);
  };

  return (
    <div className="App">
      {started && selectedTeam && !ended && (
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
      )}

      {!started && (
      <StartScreen
        teams={teams}
        startQuiz={(team) => {
        setSelectedTeam(team);
        setStarted(true);
      }}
      setDuration={setDuration}
      started={started}
      />

      )}

      {ended && (
        <ResultsScreen team={selectedTeam} correct={correct} teams={teams} />
      )}
    </div>
  );
}

export default App;



