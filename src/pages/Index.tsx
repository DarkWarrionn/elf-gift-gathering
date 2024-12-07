import React, { useState, useCallback } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { GameStats } from '@/components/GameStats';
import { MainMenu } from '@/components/MainMenu';
import { Settings } from '@/components/Settings';
import { Referrals } from '@/components/Referrals';
import { RewardCollection } from '@/components/RewardCollection';
import { TaskList } from '@/components/TaskList';
import { useToast } from "@/components/ui/use-toast";

type View = 'menu' | 'game' | 'settings' | 'referrals';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('menu');
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<CellContent[][]>([]);
  const [elfPosition, setElfPosition] = useState<[number, number]>([0, 0]);
  const [movesLeft, setMovesLeft] = useState(INITIAL_MOVES);
  const [coins, setCoins] = useState(0);
  const [tickets, setTickets] = useState(3);
  const [referralBonus, setReferralBonus] = useState(0);
  const [language, setLanguage] = useState<'en' | 'uk' | 'ru'>('en');
  const [country, setCountry] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
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

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view === 'game') {
      startGame();
    }
  };

  const handleLanguageChange = (newLanguage: 'en' | 'uk' | 'ru') => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: "Your language preference has been saved",
    });
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    toast({
      title: "Country Updated",
      description: "Your country has been updated successfully",
    });
  };

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    toast({
      title: "Wallet Connected",
      description: "Your crypto wallet has been connected successfully",
    });
  };

  const handleReferralBonus = (amount: number) => {
    setReferralBonus(prev => prev + amount);
    setCoins(prev => prev + amount);
    toast({
      title: "Referral Bonus!",
      description: `You earned ${amount} coins from your referral!`,
    });
  };

  const handleRewardCollection = (coinsEarned: number, ticketsEarned: number) => {
    setCoins(prev => prev + coinsEarned);
    setTickets(prev => prev + ticketsEarned);
  };

  const handleTaskComplete = (reward: number) => {
    setCoins(prev => prev + reward);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A365D] to-[#2C5282] p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Snowfall effect using pseudo-elements */}
        <style jsx>{`
          .snowfall {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
          }
          .snowfall::before,
          .snowfall::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            animation: snowfall 10s linear infinite;
          }
          @keyframes snowfall {
            0% { transform: translateY(-10vh) translateX(0); opacity: 1; }
            100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
          }
        `}</style>
        <div className="snowfall" />
        
        <GameStats 
          coins={coins} 
          tickets={tickets} 
          referralBonus={referralBonus}
        />

        {currentView === 'menu' && (
          <>
            <RewardCollection onCollect={handleRewardCollection} />
            <TaskList onComplete={handleTaskComplete} />
            <MainMenu 
              onStartGame={() => handleViewChange('game')} 
              onOpenSettings={() => handleViewChange('settings')}
              onOpenReferrals={() => handleViewChange('referrals')}
              hasTickets={tickets > 0}
            />
          </>
        )}

        {currentView === 'game' && isPlaying && (
          <GameGrid
            grid={grid}
            onMove={handleMove}
            movesLeft={movesLeft}
            isValidMove={isValidMove}
          />
        )}

        {currentView === 'settings' && (
          <Settings
            language={language}
            country={country}
            walletAddress={walletAddress}
            onLanguageChange={handleLanguageChange}
            onCountryChange={handleCountryChange}
            onWalletConnect={handleWalletConnect}
            onBack={() => handleViewChange('menu')}
          />
        )}

        {currentView === 'referrals' && (
          <Referrals
            referralBonus={referralBonus}
            onEarnBonus={handleReferralBonus}
            onBack={() => handleViewChange('menu')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
