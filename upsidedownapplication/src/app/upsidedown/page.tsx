"use client";
import React, { useState, useEffect } from "react";
import './page.css';


type Players = "O" | "X";
export default function Home() {

    const [turn, setTurn] = useState("O");
    const [winner, setWinner] = useState<Players | null>(null);
    const [tie, setTie] = useState<boolean | null>(null);
    const [marks, setMarks] = useState< {[key: string]: Players}>({});
    const gameOver = !!winner || !!tie;
    const [score, setScore] = useState<{[key in Players]: number}>({
      O: 0,
      X: 0,
    });

    const getSquares = () => {
      return new Array(9).fill(true);
    };

    const play = (index: number) => {
      if (marks[index] || gameOver){
        return;
      }
      setMarks((prev) => ({ ...prev, [index]: turn}));
      setTurn((prev) => (prev === "O" ? "X" : "O"));
    };

    const getCellPlayer = (index: number) => {
      if (!marks[index]) {
        return;
      }

      return marks[index];
    };

    const getWinner = () => {
      const victoryLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ]

      for (const line of victoryLines) {
        const [a, b, c] = line;

        if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){
          return marks[a];
        }
      }
    };

    const reset =() => {
      setTurn(marks[0] === "O" ? "X" : "O");
      setMarks({});
      setWinner(null);
      setTie(null);
    }

    const resetScore = () => {
      setScore({
        O: 0,
        X: 0,
      });
    };

    useEffect(() => {
      const winner = getWinner()

      if (winner) {
        setWinner(winner)
        setScore((prevScore) => ({ ...prevScore, [winner]: prevScore[winner] + 1}));
      } else {
        if (Object.keys(marks).length === 9) {
          setTie(true);
        }
      }
    }, [marks]);

    return (
      <div className="container">
      <img className="invert-element" src="/logo.svg" alt="Mundo Invertido" />

        <div className="scoreBoard">
          <p>PLACAR</p>
          <div className="scores">
            <div className="score">O: {score.O}</div>
            <div className="score">X: {score.X}</div>
          </div>
          <button onClick={resetScore}>Resetar placar</button>
        </div>
        {winner && <h1>{winner} ganhou</h1>}
        {tie && <h1>EMPATE</h1>}
        {gameOver && <button className="buttonOver" onClick={reset}>Jogar novamente</button>}
        {!gameOver && <p>É A VEZ DE {turn}</p>}
        
        <div className={`board ${gameOver ? "gameOver" : null}`}>
        {getSquares().map((_, i) => (
          <div className={`cell ${getCellPlayer(i)}`} onClick={() => play(i)}>
          {marks[i]}
          </div>
        ))}
        </div>
      </div>
    );
  }