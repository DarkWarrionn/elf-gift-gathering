import React, { useState, useCallback } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { GameStats } from '@/components/GameStats';
import { MainMenu } from '@/components/MainMenu';
import { useToast } from "@/components/ui/use-toast";

type CellContent = '🧝' | '🎁' | '🎄' | '⭐' | null;

const GRID_SIZE = 6;
const INITIAL_MOVES = 10;
const REWARDS = {
  '🎁': 25,
  '🎄': 50,
  '⭐': 100,
};

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<CellContent[][]>([]);
  const [elfPosition, setElfPosition] = useState<[number, number]>([0, 0]);
  const [movesLeft, setMovesLeft] = useState(INITIAL_MOVES);
  const [coins, setCoins] = useState(0);
  const [tickets, setTickets] = useState(3);
  const { toast } = useToast();

  const initializeGame = useCallback(() => {
    const newGrid: CellContent[][] = Array(GRID_SIZE).fill(null)
      .map(() => Array(GRID_SIZE).fill(null));
    
    // Place gifts randomly
    const gifts: CellContent[] = ['🎁', '🎁', '🎁', '🎄', '🎄', '⭐'];
    for (let gift of gifts) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (!newGrid[row][col]) {
          newGrid[row][col] = gift;
          placed = true;
        }
      }
    }

    // Place elf randomly
    let elfRow, elfCol;
    do {
      elfRow = Math.floor(Math.random() * GRID_SIZE);
      elfCol = Math.floor(Math.random() * GRID_SIZE);
    } while (newGrid[elfRow][elfCol]);

    newGrid[elfRow][elfCol] = '🧝';
    setElfPosition([elfRow, elfCol]);
    setGrid(newGrid);
    setMovesLeft(INITIAL_MOVES);
    setIsPlaying(true);
  }, []);

  const isValidMove = useCallback((row: number, col: number) => {
    if (!isPlaying || movesLeft <= 0) return false;
    const [elfRow, elfCol] = elfPosition;
    const rowDiff = Math.abs(row - elfRow);
    const colDiff = Math.abs(col - elfCol);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }, [elfPosition, isPlaying, movesLeft]);

  const handleMove = useCallback((row: number, col: number) => {
    if (!isValidMove(row, col)) return;

    const newGrid = [...grid.map(row => [...row])];
    const [oldRow, oldCol] = elfPosition;
    const targetCell = grid[row][col];

    // Collect gift if present
    if (targetCell && targetCell !== '🧝') {
      const reward = REWARDS[targetCell as keyof typeof REWARDS];
      setCoins(prev => prev + reward);
      toast({
        title: "Gift collected! 🎉",
        description: `You earned ${reward} coins!`,
      });
    }

    // Move elf
    newGrid[oldRow][oldCol] = null;
    newGrid[row][col] = '🧝';
    setGrid(newGrid);
    setElfPosition([row, col]);
    setMovesLeft(prev => prev - 1);

    // Check if game is over
    if (movesLeft <= 1) {
      toast({
        title: "Game Over!",
        description: "Thanks for playing!",
      });
      setTimeout(() => {
        setIsPlaying(false);
      }, 1500);
    }
  }, [grid, elfPosition, isValidMove, movesLeft, toast]);

  const startGame = useCallback(() => {
    if (tickets <= 0) {
      toast({
        title: "No tickets available",
        description: "Please purchase tickets to play",
        variant: "destructive",
      });
      return;
    }
    setTickets(prev => prev - 1);
    initializeGame();
  }, [tickets, initializeGame, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6F7FF] to-white p-4">
      <GameStats coins={coins} tickets={tickets} />
      
      {isPlaying ? (
        <GameGrid
          grid={grid}
          onMove={handleMove}
          movesLeft={movesLeft}
          isValidMove={isValidMove}
        />
      ) : (
        <MainMenu onStartGame={startGame} hasTickets={tickets > 0} />
      )}
    </div>
  );
};

export default Index;