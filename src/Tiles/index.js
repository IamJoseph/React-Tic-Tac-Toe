import React from "react";
import "./Tile.css";

export const Tiles = props => {
  const { location, player, value, updateBoard } = props;

  return (
    <div className="tile" onClick={() => updateBoard(location, player)}>
      <p>{value}</p>
    </div>
  );
};
