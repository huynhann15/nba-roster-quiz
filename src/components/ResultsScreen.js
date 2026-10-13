import React, { useMemo } from "react";

export default function ResultsScreen({ team, correct, teams, elapsedTime }) {
  const totalSecs = Math.ceil(elapsedTime / 1000);
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;
  const pad = (n) => (n < 10 ? `0${n}` : n);

  // returns the list of players
  const players = useMemo(() => {
    return team === "all"
      ? teams.flatMap((t) => t.players || [])
      : typeof team === "object"
      ? team.players || []
      : [];
  }, [team, teams]);

  return (
    <div className="p-5 text-center min-h-screen bg-court bg-no-repeat bg-center bg-cover">
      <h1 className="text-[2rem] mb-[10px]">Quiz Results</h1>
      <h2 className="text-2xl mb-5">{team === "all" ? "All Teams" : team.team}</h2>

      <p className="text-base mb-[15px]">
        You guessed <strong>{correct.length}</strong> out of{" "}
        <strong>{players.length}</strong> players!
      </p>
      <p className="text-base mb-[15px]">
        Time: <strong>{minutes}:{pad(seconds)}</strong>
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-[10px] justify-items-center items-start">
        {players.map((player) => {
          const guessed = correct.some(
            (p) =>
              String(player.playerName).toLowerCase().includes(String(p.playerName).toLowerCase())
          );

          return (
            <div
              key={player.playerId}
              className={`flex flex-col items-center w-full max-w-[120px] h-[140px] p-[5px] rounded-md text-center box-border ${
                guessed ? "bg-[#d4edda]" : "bg-[#f8d7da]"
              }`}
            >
              {player.image && (
                <img
                  src={player.image}
                  alt={player.playerName}
                  className="w-20 h-20 rounded-full object-cover mb-[5px]"
                />
              )}
              <p className="text-[0.8rem] font-bold font-helvetica [word-break:break-word] mb-[15px]">
                {player.playerName}
              </p>
              {!guessed && (
                <p className="mt-[2px] mb-[15px] text-[0.8rem] font-helvetica font-bold text-[rgb(200,4,4)]">
                  Missed
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
