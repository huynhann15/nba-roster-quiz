import React, { useState, useEffect } from "react";
import "./StartScreen.css";

export default function StartScreen({ teams, setSelectedTeam, setDuration }) {
  const [selectedTeamValue, setSelectedTeamValue] = useState("");
  const [customMinutes, setCustomMinutes] = useState("");

  const uniqueTeams = Array.from(new Set(teams.map((t) => t.team)));

  useEffect(() => {
    if (!selectedTeamValue) return;

    if (selectedTeamValue === "all") {
      setSelectedTeam("all");
    } else {
      const teamObj = teams.find((t) => t.team === selectedTeamValue);
      setSelectedTeam(teamObj);
    }
  }, [selectedTeamValue, teams, setSelectedTeam]);

  const handleCustomChange = (e) => {
    const minutes = e.target.value;
    setCustomMinutes(minutes);
    if (minutes && Number(minutes) > 0) {
      setDuration(Number(minutes) * 60 * 1000);
    }
  };

  const handleTeamClick = (teamName) => {
    setSelectedTeamValue(teamName);
  };

  return (
    <div className="start-screen">
      <h1>NBA Roster Quiz</h1>
      <p>Name all NBA players in the league or selected team</p>
      <p>This is for the 2024-2025 roster!</p>
      <p>Select your time before selecting your team! If you only select a team, it will automatically start the unlimited timer.</p>
      <p>Timer (minutes):</p>
      <input
        type="number"
        value={customMinutes}
        onChange={handleCustomChange}
        min="1"
      />
      <button onClick={() => setDuration("infinite")}>∞</button>
      <p>(Click the infinity button for unlimited time)</p>

      <p>Select a team:</p>
      <div className="team-grid">
        <div
          className={`team-card ${selectedTeamValue === "all" ? "selected" : ""}`}
          onClick={() => handleTeamClick("all")}
        >
          All Teams
        </div>
        {uniqueTeams.map((teamName) => (
          <div
            key={teamName}
            className={`team-card ${selectedTeamValue === teamName ? "selected" : ""}`}
            onClick={() => handleTeamClick(teamName)}
          >
            {teamName}
          </div>
        ))}
      </div>
    </div>
  );
}


