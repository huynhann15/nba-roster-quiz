import React, { useState } from "react";
import './StartScreen.css';

export default function StartScreen({
  teams,
  setSelectedTeam,
  startQuiz,
  setDuration
}) {
  const [customMinutes, setCustomMinutes] = useState("");

  // Get unique team names
  const uniqueTeams = Array.from(new Set(teams.map(team => team.team)));

  const handleCustomChange = (e) => {
    const minutes = e.target.value;
    setCustomMinutes(minutes);
    if (minutes && Number(minutes) > 0) {
      setDuration(Number(minutes) * 60 * 1000); // convert minutes to ms
    }
  };

  const handleStart = () => {
    startQuiz();
  };

  return (
    <div className="start-screen">
      <h1>NBA Roster Quiz</h1>

      <p>Select a team:</p>
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === "all") {
            setSelectedTeam("all");
          } else {
            setSelectedTeam(teams.find((t) => t.team === value));
          }
        }}
        defaultValue=""
      >
        <option value="" disabled>-- Choose a team --</option>
        <option value="all">All Teams</option>
        {uniqueTeams.map(teamName => (
          <option key={teamName} value={teamName}>{teamName}</option>
        ))}
      </select>

      <p>Timer:</p>
      <input
        type="number"
        value={customMinutes}
        onChange={handleCustomChange}
        min="1"
      />
      <button onClick={() => setDuration("infinite")}>∞</button>

      <br /><br />
      <button onClick={handleStart} disabled={!teams}>
        Start
      </button>
    </div>
  );
}

