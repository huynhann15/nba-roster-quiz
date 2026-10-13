import React, { useState, useEffect } from "react";

const teamCard =
  "flex flex-col p-3 rounded-lg border-2 border-solid border-transparent bg-nba text-white font-bold text-center cursor-pointer " +
  "transition-all duration-200 ease-in-out hover:bg-nba-light";

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
    // backdrop: dims and blurs whatever is behind the pop-up
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-nba/60 backdrop-blur-sm">
      {/* pop-up panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-title"
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-[#f0f0f0]/80 text-center text-nba shadow-2xl
                   max-[600px]:p-4"
      >
        <h1 id="start-title" className="mt-0 mb-3 text-[2rem] max-[600px]:text-[1.5rem]">
          NBA Roster Quiz
        </h1>

        <div className="text-[0.95rem] leading-snug [&>p]:my-2">
          <p>Name all NBA players in the league or all players of your selected team</p>
          <p>This is for the <strong>2025-2026</strong> roster!</p>
          <p>The spelling helper <strong>DOES NOT</strong> autofill the player.</p>
          <p>
            Select your <strong>time before selecting your team!</strong> If you only select a team,
            it will automatically start the unlimited timer.
          </p>
        </div>

        {/* timer controls */}
        <p className="mt-5 mb-2 font-bold">Timer (minutes):</p>
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            value={customMinutes}
            onChange={handleCustomChange}
            min="1"
            className="w-24 p-[6px] rounded-md border-0 bg-nba-mist text-nba text-center"
          />
          <button
            onClick={() => setDuration("infinite")}
            className="px-3 py-[6px] rounded-md border-0 bg-nba text-white font-bold cursor-pointer hover:bg-nba-hover"
          >
            ∞
          </button>
        </div>
        <p className="mt-2 mb-0 text-[0.85rem]">(Click the infinity button for unlimited time)</p>

        {/* team picker */}
        <p className="mt-5 mb-1 font-bold">Select your team:</p>
        <p className="mt-0 mb-0 text-[0.85rem]">If on mobile, scroll to find your team.</p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 my-4 max-h-[300px] overflow-y-auto">
          <div className={teamCard} onClick={() => handleTeamClick("all")}>
            All Teams
          </div>
          {uniqueTeams.map((teamName) => (
            <div
              key={teamName}
              className={teamCard}
              onClick={() => handleTeamClick(teamName)}
            >
              {teamName}
            </div>
          ))}
        </div>

        <p className="mt-2 mb-0 text-[0.8rem]">Created by Ann Huynh.</p>
      </div>
    </div>
  );
}