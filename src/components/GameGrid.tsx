import React from 'react';
import { cn } from "@/lib/utils";

type CellContent = '🧝' | '🎁' | '🎄' | '⭐' | null;

interface GameGridProps {
  grid: CellContent[][];
  onMove: (row: number, col: number) => void;
  movesLeft: number;
  isValidMove: (row: number, col: number) => boolean;
}

export const GameGrid: React.FC<GameGridProps> = ({
  grid,
  onMove,
  movesLeft,
  isValidMove,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4 text-center">
        <span className="text-primary font-bold">Moves left: {movesLeft}</span>
      </div>
      <div className="grid grid-cols-6 gap-1 bg-game-grid p-2 rounded-lg shadow-lg">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onMove(rowIndex, colIndex)}
              disabled={!isValidMove(rowIndex, colIndex)}
              className={cn(
                "w-12 h-12 flex items-center justify-center bg-game-cell border border-game-border rounded",
                "transition-all duration-200",
                isValidMove(rowIndex, colIndex) && "hover:bg-secondary/20",
                cell === '🧝' && "animate-elf-bounce"
              )}
            >
              <span className="text-2xl">{cell}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
};