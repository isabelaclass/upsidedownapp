// salvar os dados enviados pelo usuário (nome, age, email, etc) no estado global
// sem precisar chamar o endpoint para buscar as informações

import { create } from "zustand";

export const useUserState = create((set) => ({
    data: [],
    // Função para escolher uma marcação específica no tabuleiro
    setData: (userData: any[]) => set({ data: userData }),

    // Função para limpar os dados
    reset: () => set({ data: [] }),
}));