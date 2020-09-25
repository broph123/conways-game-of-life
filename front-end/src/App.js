import React, { useState, useEffect, useCallback, useRef } from "react";
import produce from "immer";

import Rules from "./components/Rules";

import "../src/App.css";

function App() {
  const numRows = 25;
  const numCols = 25;

  // Set Generation Information
  const [generation, setGeneration] = useState(0);
  const genRef = useRef();
  genRef.current = generation;

  // Simulation Running
  const [running, setRunning] = useState(false);
  const runningRef = useRef();
  runningRef.current = running;

  // Create the random RGB color values
  const ranColorNum1 = Math.floor(Math.random() * Math.floor(255));
  const ranColorNum2 = Math.floor(Math.random() * Math.floor(255));
  const ranColorNum3 = Math.floor(Math.random() * Math.floor(255));

  //Speed Hook
  const [speed, setSpeed] = useState(1000);
  console.log(speed, "Right after Our Hook");

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

    setTimeout(runSimulation, speed);
  }, [speed]);

  const handleinputChange = (e) => {
    setSpeed(e.target.value);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: ".75rem" }}>
        Conway's Game of Life
      </h1>
      <div className="MainContainer">
        <div className="gridContainer">
          <div
            className="GenAndButtons"
            style={{
              margin: "0.5rem",
            }}
          >
            <h3>Generation: {generation}</h3>

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
                setSpeed(1000);
              }}
            >
              Clear
            </button>
            <button
              onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                  rows.push(
                    Array.from(Array(numCols), () =>
                      Math.random() > 0.7 ? 1 : 0
                    )
                  );
                }
                setGrid(rows);
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                  setGeneration(0);
                }
              }}
            >
              Random
            </button>
            <input
              placeholder={`Speed:${speed}`}
              onChange={handleinputChange}
            ></input>
          </div>

          <div
            className="Grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
              // justifyContent: "center",
              margin: "2rem 5.5rem",
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

                    background: grid[i][k]
                      ? `rgb(${ranColorNum1},${ranColorNum2},${ranColorNum3})`
                      : "rgb(245, 249, 250)",
                    border: "solid 1px black",
                  }}
                />
              ))
            )}
          </div>
        </div>
        <Rules></Rules>
      </div>
    </>
  );
}

export default App;
