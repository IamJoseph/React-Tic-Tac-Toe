import React, { Component } from "react";
import "./App.css";
import { Tiles } from "./Tiles";
import { Results } from "./Results";
import { ResetButton } from "./Buttons/ResetButton";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameBoard: Array.from({ length: 9 }),
      player: "X",
      winner: null
    };
  }

  renderTiles = (c, i) => (
    <Tiles
      key={i}
      location={i}
      value={c}
      updateBoard={this.updateBoard}
      player={this.state.player}
    />
  );

  updateBoard = (location, player) => {
    const { gameBoard } = this.state;

    // Check if tile has already been taken
    if (gameBoard[location]) {
      return;
    }

    const currentGameBoard = Object.assign([...gameBoard], {
      [location]: player
    });

    this.setState({ gameBoard: currentGameBoard });
    this.checkForWinner(currentGameBoard, player);
    // Swith to other players turn
    this.setState({ player: this.state.player === "X" ? "O" : "X" });
  };

  checkForWinner = (currentBoard, player) => {
    const tileCombinations = [
      currentBoard[0] + currentBoard[1] + currentBoard[2],
      currentBoard[3] + currentBoard[4] + currentBoard[5],
      currentBoard[6] + currentBoard[7] + currentBoard[8],
      currentBoard[0] + currentBoard[3] + currentBoard[6],
      currentBoard[1] + currentBoard[4] + currentBoard[7],
      currentBoard[2] + currentBoard[5] + currentBoard[8],
      currentBoard[0] + currentBoard[4] + currentBoard[8],
      currentBoard[2] + currentBoard[4] + currentBoard[6]
    ];

    //  Check for a winner or a draw
    if (/XXX|OOO/.test([...tileCombinations])) {
      this.setState({ winner: player });
      return;
    } else if (tileCombinations.every(c => c.length === 3)) {
      this.setState({ winner: "Draw" });
      return;
    }
  };

  resetBoard = () => {
    this.setState({
      gameBoard: Array.from({ length: 9 }),
      player: "X",
      winner: null
    });
  };

  render() {
    return (
      <div className="container">
        <h1>
          <u>Tic-</u>
          <u>Tac-</u>
          <u>Toe</u>
        </h1>
        <Results winner={this.state.winner} />
        <div className="boardContainer">
          {this.state.gameBoard.map(this.renderTiles)}
          <ResetButton reset={this.resetBoard} />
        </div>
      </div>
    );
  }
}
