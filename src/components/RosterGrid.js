import React from "react";
import "./RosterGrid.css"
export default function RosterGrid({ team, correct, teams, selectedTeam }) {
  const teamsToDisplay =
    selectedTeam === "all" ? teams : [selectedTeam];

  return (
    <div className="roster-grid-container">
      {teamsToDisplay.map((teamObj) => (
        <div key={teamObj.team} className="team-section">
          <h2>{teamObj.team}</h2>
          <div className="roster-grid">
            {teamObj.players.map((player) => {
              const guessed = correct.includes(player.playerName);
              return (
                <div key={player.playerId} className="player-card">
                  {guessed ? (
                    <>
                      {player.image && (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className="player-image"
                        />
                      )}
                      <p className="player-name">
                        {player.playerName} ({player.position})
                      </p>
                    </>
                  ) : (
                    <div className="placeholder">—</div>
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
