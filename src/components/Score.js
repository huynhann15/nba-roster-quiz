import React from "react";

export default function Score({ correct, total }) {
  return (
    <div className="score">
      <p>
         <strong>{correct}</strong> / {total}
      </p>
    </div>
  );
}

