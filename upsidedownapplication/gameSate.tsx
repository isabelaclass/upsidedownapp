import create from "zustand";

// Define o tipo Players como "O" ou "X"
type Players = "O" | "X";

// Define a interface para o estado do jogo
interface GameState {
  turn: Players; // Indica de quem é a vez de jogar
  winner: Players | null; // Indica o vencedor do jogo
  tie: boolean | null; // Indica se houve empate
  marks: { [key: string]: Players }; // Mapeia as marcações no tabuleiro
  score: { [key in Players]: number }; // Mapeia o placar do jogo
  play: (index: number) => void; // Função para jogar em uma célula específica
  reset: () => void; // Função para reiniciar o jogo
  resetScore: () => void; // Função para reiniciar o placar
}

// Cria o hook useGameState usando o Zustand, que gerencia o estado do jogo
export const useGameState = create<GameState>((set) => ({
  turn: "O", // Define o jogador inicial como "O"
  winner: null, // Ao começar ainda não há vencedor
  tie: null, // Ao iniciar ainda não há empate
  marks: {}, // Ao iniciar, não há marcações no tabuleiro
  score: { O: 0, X: 0 }, // Inicializa o placar com zero para ambos os jogadores

  // Função para escolher uma marcação específica no tabuleiro
  play: (index: number) => set((state) => {
    if (state.marks[index] || !!state.winner || !!state.tie) return state; // Se a célula já estiver marcada ou o jogo já estiver acabado, não faz nada

    const marks = { ...state.marks, [index]: state.turn }; // Mostra a marcação com o jogador atual
    const turn = state.turn === "O" ? "X" : "O"; // Alterna a vez para o próximo jogador

    const winner = getWinner(marks); // Verifica se há um vencedor após esta jogada

    if (winner) {
      const score = { ...state.score, [winner]: state.score[winner] + 1 }; // Se houver um vencedor, atualiza o placar
      return { ...state, marks, turn, winner, score }; // Retorna o novo estado com o vencedor e o placar atualizados
    }

    const tie = Object.keys(marks).length === 9; // Verifica se houve empate

    return { ...state, marks, turn, tie };// Retorna o novo estado com as marcações, a vez do próximo jogador e se houve empate
  }),

  // Função para reiniciar o jogo
  reset: () => set({ turn: "O", winner: null, tie: null, marks: {} }),

  // Função para reiniciar o placar
  resetScore: () => set({ score: { O: 0, X: 0 } }),
}));

// Função para determinar o vencedor com base nas marcações no tabuleiro
const getWinner = (marks: { [key: string]: Players }) => {
  const victoryLines = [ // Define todas as possíveis linhas de vitória no tabuleiro
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  // Itera sobre as linhas de vitória
  for (const line of victoryLines) {
    const [a, b, c] = line;

    // Verifica se há uma linha onde todas as células estão marcadas pelo mesmo jogador
    if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]){
      return marks[a]; // Retorna o jogador que venceu
    }
  }

  return null; // Se não houver vencedor em nenhuma das linhas, retorna vazio
};