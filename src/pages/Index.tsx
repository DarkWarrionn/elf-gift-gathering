import React, { useState, useCallback, useEffect } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { GameStats } from '@/components/GameStats';
import { MainMenu } from '@/components/MainMenu';
import { Settings } from '@/components/Settings';
import { Referrals } from '@/components/Referrals';
import { RewardCollection } from '@/components/RewardCollection';
import { TaskList } from '@/components/TaskList';
import { useToast } from "@/components/ui/use-toast";
import { CellContent } from '@/types/game';
import { GRID_SIZE, INITIAL_MOVES, REWARDS } from '@/constants/game';
import { Language, getTranslation } from '@/utils/language';
import { useGameState } from '@/hooks/useGameState';
import { useGameHandlers } from '@/hooks/useGameHandlers';

type View = 'menu' | 'game' | 'settings' | 'referrals';

const STORAGE_KEY = 'elfGameState';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('menu');
  const { toast } = useToast();
  
  const {
    isPlaying,
    grid,
    elfPosition,
    movesLeft,
    coins,
    tickets,
    referralBonus,
    language,
    country,
    walletAddress,
    gameEnded,
    setIsPlaying,
    setGrid,
    setElfPosition,
    setMovesLeft,
    setCoins,
    setTickets,
    setReferralBonus,
    setLanguage,
    setCountry,
    setWalletAddress,
    setGameEnded
  } = useGameState(STORAGE_KEY);

  const {
    handleRewardCollection,
    handleTaskComplete,
    handleCountryChange,
    handleWalletConnect,
    handleReferralBonus,
    initializeGame,
    handleMove,
    isValidMove
  } = useGameHandlers({
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
  });

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    if (view === 'game') {
      startGame();
    }
  };

  const startGame = useCallback(() => {
    if (tickets <= 0) {
      toast({
        title: getTranslation(language, 'noTickets'),
        description: getTranslation(language, 'purchaseTickets'),
        variant: "destructive",
      });
      return;
    }
    setTickets(prev => prev - 1);
    initializeGame();
  }, [tickets, initializeGame, toast, language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: "Your language preference has been saved",
    });
  };

  const handleReturnToMenu = useCallback(() => {
    setCurrentView('menu');
    setIsPlaying(false);
    setGameEnded(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A365D] to-[#2C5282] p-4">
      <div className="max-w-md mx-auto space-y-4">
        <style jsx>
          {`
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
          `}
        </style>
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
              language={language}
            />
          </>
        )}

        {currentView === 'game' && isPlaying && (
          <GameGrid
            grid={grid}
            onMove={handleMove}
            movesLeft={movesLeft}
            isValidMove={isValidMove}
            language={language}
            onReturnToMenu={handleReturnToMenu}
            gameEnded={gameEnded}
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