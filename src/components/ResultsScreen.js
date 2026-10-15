import React, { useMemo } from "react";
import RosterGrid from "./RosterGrid";

export default function ResultsScreen({ team, correct, teams, elapsedTime, onPlayAgain }) {
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
    // backdrop: dims and blurs whatever is behind the pop-up (same as the start pop-up)
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-nba/60 backdrop-blur-sm max-[600px]:p-2">
      {/* pop-up panel — wider than the start pop-up so the team boxes have room */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-title"
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 rounded-xl bg-[#f0f0f0]/80 text-center text-nba shadow-2xl
                   max-[600px]:p-3 max-[600px]:max-h-[95vh]"
      >
        <h1 id="results-title" className="mt-0 mb-[10px] text-[2rem] max-[600px]:text-[1.5rem]">
          Quiz Results
        </h1>
        <h2 className="mt-0 mb-4 text-2xl max-[600px]:text-xl">
          {team === "all" ? "All Teams" : team.team}
        </h2>

        <p className="my-2 text-base">
          You guessed <strong>{correct.length}</strong> out of{" "}
          <strong>{players.length}</strong> players!
        </p>
        <p className="mt-0 mb-4 text-base">
          Time: <strong>{minutes}:{pad(seconds)}</strong>
        </p>

        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="mb-5 px-5 py-2 rounded-lg border-0 bg-nba text-white text-base font-bold font-helvetica cursor-pointer
                       transition-all duration-200 ease-in-out hover:bg-nba-hover"
          >
            Play Again
          </button>
        )}

        {/* green = guessed, pink + "Missed" = not guessed */}
        <RosterGrid
          teams={teams}
          selectedTeam={team}
          correct={correct}
          revealedAll={true}
          showHints={false}
          variant="results"
        />
      </div>
    </div>
  );
}