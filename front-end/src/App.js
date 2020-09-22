import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import "../src/App.css";

function App() {
  const numRows = 30;
  const numCols = 30;

  // Set Generation Information
  const [generation, setGeneration] = useState(0);
  const genRef = useRef();
  genRef.current = generation;

  // Simulation Running
  const [running, setRunning] = useState(false);
  const runningRef = useRef();
  runningRef.current = running;

  // Check if the coordinal neighbors
  const cellNeighs = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 0],
  ];

  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGeneration((genRef.current += 1));
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            cellNeighs.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Conway's Game of Life</h1>
      <h2 style={{ textAlign: "center" }}>Generation: {generation}</h2>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
              setGeneration(0);
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
            setGeneration(0);
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Random
        </button>
      </div>
      {/* OverAll Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          justifyContent: "center",
          margin: "25px 0px",
        }}
      >
        {/* Grid Boxes */}
        {grid.map((row, i) =>
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,

                background: grid[i][k] ? "blue" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
