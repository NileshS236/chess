import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";

import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => subscribe.unsubscribe();
  }, []);

  return (
    <>
      <div className="app">
        <h1>Press R to reset the Board.</h1>
        <div className="main">
          {isGameOver && (
            <h2 className="vertical-text">
              GAME OVER
              <button onClick={resetGame}>
                <span className="vertical-text">NEW GAME</span>
              </button>
            </h2>
          )}
          <div className="board-container">
            <Board board={board} turn={turn} />
          </div>
          {result && <p className="vertical-text">{result}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
