import { useCallback } from 'react';
import { CellContent } from '@/types/game';
import { GRID_SIZE, INITIAL_MOVES, REWARDS } from '@/constants/game';
import { Language, getTranslation } from '@/utils/language';

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
  toast: any;
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
    console.log('Game initialized');
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

    const newGrid = [...grid.map(row => [...row])];
    const [oldRow, oldCol] = elfPosition;
    const targetCell = grid[row][col];

    if (targetCell && targetCell !== '🧝') {
      const reward = REWARDS[targetCell as keyof typeof REWARDS] || 0;
      setCoins(prevCoins => prevCoins + reward);
      toast({
        title: getTranslation(language, 'rewardsCollected'),
        description: `+${reward} ${getTranslation(language, 'coins')}!`,
      });
    }

    newGrid[oldRow][oldCol] = null;
    newGrid[row][col] = '🧝';
    setGrid(newGrid);
    setElfPosition([row, col]);
    setMovesLeft(prev => prev - 1);

    if (movesLeft <= 1) {
      setGameEnded(true);
      toast({
        title: getTranslation(language, 'gameOver'),
        description: getTranslation(language, 'thanks'),
      });
    }
    
    console.log('Move made:', { row, col, movesLeft: movesLeft - 1 });
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