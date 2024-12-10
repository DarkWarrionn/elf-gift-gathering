import React, { useCallback } from 'react';
import { CellContent } from '@/types/game';
import { GRID_SIZE, INITIAL_MOVES, REWARDS } from '@/constants/game';
import { Language, getTranslation } from '@/utils/language';
import { useToast } from "@/hooks/use-toast";

interface UseGameHandlersProps {
  isPlaying: boolean;
  grid: CellContent[][];
  elfPosition: [number, number];
  movesLeft: number;
  setGrid: (grid: CellContent[][]) => void;
  setElfPosition: (position: [number, number]) => void;
  setMovesLeft: (moves: number) => void;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  setGameEnded: (ended: boolean) => void;
  toast: ReturnType<typeof useToast>;
  language: Language;
}

export const useGameHandlers = ({
  isPlaying,
  grid,
  elfPosition,
  movesLeft,
  setGrid,
  setElfPosition,
  setMovesLeft,
  setCoins,
  setGameEnded,
  toast,
  language
}: UseGameHandlersProps) => {
  const handleRewardCollection = useCallback((coins: number, tickets: number) => {
    setCoins(prevCoins => prevCoins + coins);
    console.log('Rewards collected:', { coins, tickets });
  }, [setCoins]);

  const handleTaskComplete = useCallback((reward: number) => {
    setCoins(prevCoins => prevCoins + reward);
    console.log('Task completed with reward:', reward);
  }, [setCoins]);

  const handleCountryChange = useCallback((country: string) => {
    console.log('Country changed to:', country);
  }, []);

  const handleWalletConnect = useCallback((address: string) => {
    console.log('Wallet connected:', address);
  }, []);

  const handleReferralBonus = useCallback((amount: number) => {
    setCoins(prevCoins => prevCoins + amount);
    console.log('Referral bonus earned:', amount);
  }, [setCoins]);

  const initializeGame = useCallback(() => {
    console.log('Initializing game...');
    const newGrid: CellContent[][] = Array(GRID_SIZE).fill(null)
      .map(() => Array(GRID_SIZE).fill(null));
    
    const gifts: CellContent[] = ['🎁', '🎁', '🎁', '🎄', '🎄', '⭐'];
    for (let gift of gifts) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);
        if (!newGrid[row][col]) {
          newGrid[row][col] = gift;
          placed = true;
          console.log(`Placed ${gift} at position [${row}, ${col}]`);
        }
      }
    }

    let elfRow, elfCol;
    do {
      elfRow = Math.floor(Math.random() * GRID_SIZE);
      elfCol = Math.floor(Math.random() * GRID_SIZE);
    } while (newGrid[elfRow][elfCol]);

    newGrid[elfRow][elfCol] = '🧝';
    setElfPosition([elfRow, elfCol]);
    setGrid(newGrid);
    setMovesLeft(INITIAL_MOVES);
    console.log('Game initialized with elf at position:', [elfRow, elfCol]);
  }, [setGrid, setElfPosition, setMovesLeft]);

  const isValidMove = useCallback((row: number, col: number) => {
    if (!isPlaying || movesLeft <= 0) return false;
    const [elfRow, elfCol] = elfPosition;
    const rowDiff = Math.abs(row - elfRow);
    const colDiff = Math.abs(col - elfCol);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }, [elfPosition, isPlaying, movesLeft]);

  const handleMove = useCallback((row: number, col: number) => {
    if (!isValidMove(row, col)) return;

    console.log('Processing move to position:', [row, col]);
    const newGrid = [...grid.map(row => [...row])];
    const [oldRow, oldCol] = elfPosition;
    const targetCell = grid[row][col];

    if (targetCell && targetCell !== '🧝') {
      const reward = REWARDS[targetCell as keyof typeof REWARDS] || 0;
      setCoins((prevCoins: number) => prevCoins + reward);
      toast.toast({
        title: getTranslation(language, 'rewardsCollected'),
        description: `+${reward} ${getTranslation(language, 'coins')}!`,
      });
      console.log('Reward collected:', reward);
    }

    newGrid[oldRow][oldCol] = null;
    newGrid[row][col] = '🧝';
    setGrid(newGrid);
    setElfPosition([row, col]);
    setMovesLeft(prev => prev - 1);

    if (movesLeft <= 1) {
      setGameEnded(true);
      toast.toast({
        title: getTranslation(language, 'gameOver'),
        description: getTranslation(language, 'thanks'),
      });
      console.log('Game ended due to no moves left');
    }
  }, [grid, elfPosition, isValidMove, movesLeft, setGrid, setElfPosition, setMovesLeft, setCoins, setGameEnded, toast, language]);

  return {
    handleRewardCollection,
    handleTaskComplete,
    handleCountryChange,
    handleWalletConnect,
    handleReferralBonus,
    initializeGame,
    handleMove,
    isValidMove
  };
};