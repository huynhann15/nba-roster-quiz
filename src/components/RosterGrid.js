import React from "react";

const md = "max-[768px]"; // matches the old @media (max-width: 768px)

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

  const containerClass = isAllTeams
    ? `grid grid-cols-5 gap-[10px] p-[10px] w-full box-border h-[calc(100vh-80px)] overflow-y-auto
       ${md}:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] ${md}:gap-3`
    : "w-full h-auto";

  const teamCardClass = isAllTeams
    ? `flex flex-col p-[5px] rounded-md border border-solid border-[#ccc] bg-nba text-[#f8f8f8]
       ${md}:p-1 ${md}:text-[0.85rem]`
    : "";

  const rosterGridClass = isAllTeams
    ? "grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-1"
    : `grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 w-full box-border
       ${md}:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] ${md}:gap-[6px]`;

  return (
    <div className={containerClass}>
      {teamsToDisplay.map((teamObj) => (
        <div key={teamObj.team} className={teamCardClass}>
          {!isAllTeams && <h2>{teamObj.team}</h2>}
          {isAllTeams && (
            <div className={`font-bold text-base mb-[5px] shrink-0 ${md}:text-[0.85rem]`}>
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
                  className={`flex flex-col items-center justify-start p-1 rounded-md text-center box-border ${cardBg} ${md}:p-[2px]`}
                >
                  {showPlayer ? (
                    <>
                      {player.image && (
                        <img
                          src={player.image}
                          alt={player.playerName}
                          className={`h-auto rounded-full ${md}:object-cover ${
                            guessed ? "w-[90%]" : `w-[80%] ${md}:w-12 ${md}:h-12`
                          }`}
                        />
                      )}
                      <p
                        className={`mt-1 text-[0.65rem] font-bold text-black [word-break:break-word] ${md}:mt-[2px] ${md}:text-[0.6rem]`}
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
                      {showHints && player.jerseyNumber ? (
                        <div className={`font-helvetica font-bold text-[1.5rem] text-black ${md}:text-[1.2rem]`}>
                          #{player.jerseyNumber}
                        </div>
                       ) : (
                          <img
                            src={`${process.env.PUBLIC_URL}/assets/placeholder.png`}
                            alt="placeholder"
                            className={`w-10 h-10 ${md}:w-8 ${md}:h-8`}
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




