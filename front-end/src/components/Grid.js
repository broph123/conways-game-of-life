import React from "react";

// const Grid = () => {
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: `repeat(${numCols}, 20px)`,
//       }}
//     >
//       {grid.map((row, i) =>
//         row.map((col, k) => (
//           <div
//             key={`${i}-${k}`}
//             onClick={() => {
//               const newGrid = produce(grid, (gridCopy) => {
//                 gridCopy[i][k] = grid[i][k] ? 0 : 1;
//               });
//               setGrid(newGrid);
//             }}
//             style={{
//               width: 20,
//               height: 20,
//               backgroundColor: grid[i][k] ? "blue" : undefined,
//               border: "solid 1px black",
//             }}
//           />
//         ))
//       )}
//     </div>
//   );
// };
// export default Grid;
