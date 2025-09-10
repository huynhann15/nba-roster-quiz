import React, { useState, useEffect } from "react";
import './StartScreen.css';

export default function StartScreen({ teams, startQuiz, setDuration, started }) {
  const [customMinutes, setCustomMinutes] = useState("");
  const [selectedTeamValue, setSelectedTeamValue] = useState("");

  const uniqueTeams = Array.from(new Set(teams.map(team => team.team)));

  const handleCustomChange = (e) => {
    const minutes = e.target.value;
    setCustomMinutes(minutes);
    if (minutes && Number(minutes) > 0) {
      setDuration(Number(minutes) * 60 * 1000);
    }
  };

  useEffect(() => {
    if (selectedTeamValue) {
      const teamObj = selectedTeamValue === "all"
        ? "all"
        : teams.find((t) => t.team === selectedTeamValue);

      startQuiz(teamObj);
    }
  }, [selectedTeamValue, startQuiz, teams]);

  return (
    <div className={`start-screen ${started ? "hidden" : ""}`}>
      <h1>NBA Roster Quiz</h1>
       <p>Select your time before your team!</p>
        <p>Timer (minutes):</p>
      <input
        type="number"
        value={customMinutes}
        onChange={handleCustomChange}
        min="1"
      />
      <button onClick={() => setDuration("infinite")}>∞</button>
      <p>(click the infinity button for unlimited time)</p>
      <p>Select a team:</p>
      <select
        onChange={(e) => setSelectedTeamValue(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>-- Choose a team --</option>
        <option value="all">All Teams</option>
        {uniqueTeams.map(teamName => (
          <option key={teamName} value={teamName}>{teamName}</option>
        ))}
      </select>


    </div>
  );
}

