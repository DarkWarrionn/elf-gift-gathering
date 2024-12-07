export type CellContent = '🧝' | '🎁' | '🎄' | '⭐' | null;

export interface GameState {
  grid: CellContent[][];
  elfPosition: [number, number];
  movesLeft: number;
  coins: number;
  tickets: number;
}