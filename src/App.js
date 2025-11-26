import React, { useState } from "react";
import "./App.css";
import teams from "./data/24-25roster.json";
import StartScreen from "./components/StartScreen";
import Quiz from "./components/Quiz";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [ended, setEnded] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [input, setInput] = useState("");
  const [duration, setDuration] = useState("infinite");
  const [elapsedTime, setElapsedTime] = useState(0);

  const [guessedFullNames, setGuessedFullNames] = useState(new Set());

  const handleGuess = (e, overrideGuess) => {
    if (e?.preventDefault) e.preventDefault();
    if (!selectedTeam) return;

    const guessRaw = (overrideGuess ?? input).trim();
    if (!guessRaw) return;

    const guess = guessRaw.toLowerCase();

    const allPlayers =
      selectedTeam === "all"
        ? teams.flatMap((t) => t.players || [])
        : selectedTeam?.players || [];

    const matches = allPlayers.filter((p) => {
      const fullName = p.playerName.trim().toLowerCase();
      const lastName = fullName.split(" ").pop();
      return fullName === guess || lastName === guess;
    });

    if (matches.length === 0) {
      setInput("");
      return;
    }

    const newMatches = matches.filter(
      (p) => !guessedFullNames.has(p.playerName.trim().toLowerCase())
    );

    if (newMatches.length === 0) {
      setInput("");
      return;
    }

    setGuessedFullNames((prev) => {
      const updated = new Set(prev);
      newMatches.forEach((p) => updated.add(p.playerName.trim().toLowerCase()));
      return updated;
    });

    setCorrect((prevCorrect) => {
      const existingNames = new Set(
        prevCorrect.map((p) => p.playerName.toLowerCase())
      );
      const filteredNew = newMatches.filter(
        (p) => !existingNames.has(p.playerName.toLowerCase())
      );
      return [...prevCorrect, ...filteredNew];
    });

    setInput("");
  };

  return (
    <div className="App">
      {!selectedTeam && (
        <StartScreen
          teams={teams}
          setSelectedTeam={setSelectedTeam}
          setDuration={setDuration}
        />
      )}

      {selectedTeam && !ended && (
        <Quiz
          selectedTeam={selectedTeam}
          correct={correct}
          setCorrect={setCorrect}
          input={input}
          setInput={setInput}
          handleGuess={handleGuess}
          setEnded={setEnded}
          duration={duration}
          teams={teams}
          setElapsedTime={setElapsedTime}
        />
      )}

      {ended && selectedTeam && (
        <ResultsScreen
          team={selectedTeam}
          correct={correct}
          teams={teams}
          elapsedTime={elapsedTime}
        />
      )}
    </div>
  );
}

export default App;




