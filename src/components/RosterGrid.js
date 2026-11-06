import React from "react";

// Mobile classes use the literal prefix "max-[768px]:" (matches the old @media (max-width: 768px)).
// Tailwind scans files as plain text, so the prefix must be written out, never built from a variable.

// variant="quiz"    → grid scrolls inside the viewport under the fixed header (page scrolls on mobile)
// variant="results" → grid grows with the page and skips the single-team title
export default function RosterGrid({ correct, teams, selectedTeam, revealedAll, showHints, variant = "quiz" }) {
  const isResults = variant === "results";
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

  const containerClass = isAllTeams
    ? `grid grid-cols-5 gap-[10px] p-[10px] w-full box-border text-left
       ${isResults ? "" : "h-[calc(100vh-80px)] overflow-y-auto max-[768px]:h-auto max-[768px]:overflow-visible"}
       max-[768px]:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] max-[768px]:gap-3`
    : "w-full h-auto";

  const teamCardClass = isAllTeams
    ? `flex flex-col p-[5px] rounded-md border border-solid border-[#ccc] bg-nba text-[#f8f8f8]
       max-[768px]:p-1 max-[768px]:text-[0.85rem]`
    : "";

  const rosterGridClass = isAllTeams
    ? "grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1"
    : `grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 w-full box-border
       max-[768px]:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] max-[768px]:gap-[6px]`;

  return (
    <div className={containerClass}>
      {teamsToDisplay.map((teamObj) => (
        <div key={teamObj.team} className={teamCardClass}>
          {!isAllTeams && !isResults && <h2>{teamObj.team}</h2>}
          {isAllTeams && (
            <div className={`font-bold text-base mb-[5px] shrink-0 max-[768px]:text-[0.85rem]`}>
              {teamObj.team}
            </div>
          )}

          <div className={rosterGridClass}>
            {teamObj.players?.map((player) => {
              const guessed = correct.some(
                (p) => p.playerName.toLowerCase() === player.playerName.toLowerCase()
              );
              const showPlayer = guessed || revealedAll;
              const missed = revealedAll && !guessed;

              const cardBg = guessed
                ? "bg-[#d4edda]"
                : missed
                ? "bg-[#f8d7da]"
                : "bg-[#f0f0f0]";

              return (
                <div
                  key={player.playerId}
                  className={`flex flex-col items-center justify-start p-1 rounded-md text-center box-border ${cardBg} max-[768px]:p-[2px]`}
                >
                  {showPlayer ? (
                    <>
                      {player.image && (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className={`h-auto rounded-full max-[768px]:object-cover ${
                            guessed ? "w-[90%]" : `w-[80%] max-[768px]:w-12 max-[768px]:h-12`
                          }`}
                        />
                      )}
                      <p
                        className={`mt-1 text-[0.65rem] font-bold text-black [word-break:break-word] max-[768px]:mt-[2px] max-[768px]:text-[0.6rem]`}
                      >
                        {player.playerName}
                      </p>
                      {missed && (
                        <p className="mt-[2px] text-[0.8rem] font-helvetica font-bold text-[rgb(200,4,4)]">
                          Missed
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-[50px] h-[50px] m-[5px] text-black">
                      {/* hints on → jersey number replaces the basketball icon */}
                      {showHints && player.jerseyNumber ? (
                        <div className={`font-helvetica font-bold text-[1.5rem] text-nba max-[768px]:text-[1.2rem]`}>
                          #{player.jerseyNumber}
                        </div>
                      ) : (
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/placeholder.png`}
                          alt="placeholder"
                          className={`w-10 h-10 max-[768px]:w-8 max-[768px]:h-8`}
                        />
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



