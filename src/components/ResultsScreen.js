import React, { useMemo } from "react";
import RosterGrid from "./RosterGrid";

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

      {/* same layout as the quiz board, with every player revealed:
          green = guessed, pink + "Missed" = not guessed */}
      <RosterGrid
        teams={teams}
        selectedTeam={team}
        correct={correct}
        revealedAll={true}
        showHints={false}
        variant="results"
      />
    </div>
  );
}
