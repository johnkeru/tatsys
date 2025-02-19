import { TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableBodyLoading = ({ numRow = 15, numCell = 10 }) => {
  const rows = Array.from({ length: numRow }, (_, index) => index + 1);
  const cells = Array.from({ length: numCell }, (_, index) => index + 1);
  const getRandomDuration = () => {
    return `${Math.random() * (1.5 - 0.5) + 0.5}s`;
  };

  return (
    <TableBody>
      {rows.map((v) => (
        <TableRow className="fade-in" key={v}>
          {cells.map((num) => (
            <TableCell
              key={num}
              className="loading-cell"
              sx={{
                animationDuration: getRandomDuration(),
                py: 3,
                border: "2px solid white",
              }}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyLoading;
