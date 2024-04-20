import React from "react";
import './page.css';

type Players = "O" | "X";
export default function Home() {

    const [turn, setTurn] = React.useState("O");
    const [winner, setWinner] = React.useState<Players | null>(null);
    const [tie, setTie] = React.useState<boolean | null>(null);
    const [marks, setMarks] = React.useState< {[key: string]: Players}>({});

    const getSquares = () => {
      return new Array(9).fill(true);
    }

    const play = (index: number) => {
      setMarks(prev => ({ ...prev, [index]: turn}))
      setTurn(prev => prev === "O" ? "X" : "O")
    }

    return (
      <div className="container">
        <h1>O ganhou</h1>
        <h1>Empate</h1>
        <button>Jogar novamente</button>

        <p>É a vez de X</p>
        <div className="board">
        {getSquares().map((_, i) => (
          <div className="cell" onClick={() => play(i)}>
          {marks[i]}
          </div>
        ))}
        </div>
      </div>
    );
  }