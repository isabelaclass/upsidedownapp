import create from "zustand";

type Players = "O" | "X";

interface GameState {
  turn: Players;
  winner: Players | null;
  tie: boolean | null;
  marks: { [key: string]: Players };
  score: { [key in Players]: number };
  play: (index: number) => void;
  reset: () => void;
  resetScore: () => void;
}

export const useGameState = create<GameState>((set) => ({
  turn: "O",
  winner: null,
  tie: null,
  marks: {},
  score: { O: 0, X: 0 },

  play: (index: number) => set((state) => {
    if (state.marks[index] || !!state.winner || !!state.tie) return state;

    const marks = { ...state.marks, [index]: state.turn };
    const turn = state.turn === "O" ? "X" : "O";

    const winner = getWinner(marks);

    if (winner) {
      const score = { ...state.score, [winner]: state.score[winner] + 1 };
      return { ...state, marks, turn, winner, score };
    }

    const tie = Object.keys(marks).length === 9;

    return { ...state, marks, turn, tie };
  }),

  reset: () => set({ turn: "O", winner: null, tie: null, marks: {} }),

  resetScore: () => set({ score: { O: 0, X: 0 } }),
}));

const getWinner = (marks: { [key: string]: Players }) => {
  const victoryLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  for (const line of victoryLines) {
    const [a, b, c] = line;

    if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){
      return marks[a];
    }
  }

  return null;
};