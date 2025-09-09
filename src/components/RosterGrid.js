import React from "react";
import "./RosterGrid.css";

export default function RosterGrid({ correct, teams, selectedTeam }) {
  if (selectedTeam === "all") {
    return (
      <div className="roster-grid-container all-teams">
        {teams.map((teamObj) => (
          <div key={teamObj.team} className="team-card">
            <div className="team-name">{teamObj.team}</div>
            <div className="roster-grid">
              {teamObj.players.map((player) => {
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
                      <div className="placeholder"> <img src="/assets/basketball-icon.png" alt="placeholder" className="placeholder-image"/> </div>
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

  const teamObj =
    typeof selectedTeam === "object"
      ? selectedTeam
      : teams.find((t) => t.team === selectedTeam);

  return (
    <div className="roster-grid-container single-team">
      <h2>{teamObj.team}</h2>
      <div className="roster-grid">
        {teamObj.players.map((player) => {
          const guessed = correct.includes(player.playerName);
          return (
            <div key={player.playerId} className={`player-card ${guessed ? "revealed" : ""}`}>
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
                    <img src="/assets/basketball-icon.png" alt="placeholder" className="placeholder-image"/>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


