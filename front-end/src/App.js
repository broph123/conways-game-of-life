import React, { useState } from "react";

import "./App.css";

function App() {
  const numRows = 30;
  const numCols = 30;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, 20px)`,
      }}
    >
      {grid.map((row, i) =>
        row.map((col, k) => (
          <div
            key={`${i}-${k}`}
            style={{
              width: 20,
              height: 20,
              backgroundColor: grid[i][k] ? "blue" : undefined,
              border: "solid 1px black",
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
