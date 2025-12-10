import React from "react";
import "./RosterGrid.css";

export default function RosterGrid({ correct, teams, selectedTeam, revealedAll, showHints }) {
  let teamsToDisplay = [];
  const isAllTeams = selectedTeam === "all";

  if (isAllTeams) {
    teamsToDisplay = teams;
  } else if (selectedTeam && typeof selectedTeam === "object") {
    teamsToDisplay = [selectedTeam];
  } else {
    teamsToDisplay = [];
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
              const guessed = correct.some(
                (p) => p.playerName.toLowerCase() === player.playerName.toLowerCase()
              );
              const showPlayer = guessed || revealedAll;

              return (
                <div
                  key={player.playerId}
                  className={`player-card ${guessed ? "revealed" : ""} ${
                    revealedAll && !guessed ? "missed" : ""
                  }`}
                >
                  {showPlayer ? (
                    <>
                      {player.image && (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className="player-image"
                        />
                      )}
                      <p className="player-name">{player.playerName}</p>
                      {revealedAll && !guessed && (
                        <p className="missed-label">Missed</p>
                      )}
                    </>
                  ) : (
                    <div className="placeholder">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/placeholder.png`}
                        alt="placeholder"
                        className="placeholder-image"
                      />
                        {showHints && player.jerseyNumber && (
                        <div className="jersey-hint">#{player.jerseyNumber}</div>
                      )}
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







