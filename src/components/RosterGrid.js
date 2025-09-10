import React from "react";
import "./RosterGrid.css";

export default function RosterGrid({ correct, teams, selectedTeam }) {
  let teamsToDisplay = [];
  const isAllTeams = selectedTeam === "all";

  if (isAllTeams) {
    teamsToDisplay = teams;
  } else if (selectedTeam && typeof selectedTeam === "object") {
    teamsToDisplay = [selectedTeam];
  } else {
    teamsToDisplay = []; // fallback so nothing breaks
  }

  if (!teamsToDisplay.length) return null;

  return (
    <div
      className={`roster-grid-container ${
        isAllTeams ? "all-teams" : "single-team"
      }`}
    >
      {teamsToDisplay.map((teamObj) => (
        <div key={teamObj.team} className={isAllTeams ? "team-card" : ""}>
          {!isAllTeams && <h2>{teamObj.team}</h2>}
          {isAllTeams && <div className="team-name">{teamObj.team}</div>}

          <div className="roster-grid">
            {teamObj.players?.map((player) => {
              const guessed = correct.includes(player.playerName);

              return (
                <div
                  key={player.playerId}
                  className={`player-card ${guessed ? "revealed" : ""}`}
                >
                  {guessed ? (
                    <>
                      {player.image && (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className="player-image"
                        />
                      )}
                      <p className="player-name">{player.playerName}</p>
                    </>
                  ) : (
                    <div className="placeholder">
                      <img
                        src="/assets/placeholderbasketball.png"
                        alt="placeholder"
                        className="placeholder-image"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}





