import React, { useState, useCallback } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { GameStats } from '@/components/GameStats';
import { MainMenu } from '@/components/MainMenu';
import { Settings } from '@/components/Settings';
import { Referrals } from '@/components/Referrals';
import { Shop } from '@/components/Shop';
import { RewardCollection } from '@/components/RewardCollection';
import { TaskList } from '@/components/TaskList';
import { useToast } from "@/components/ui/use-toast";
import { useGameState } from '@/hooks/useGameState';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { Language, getTranslation } from '@/utils/language';

type View = 'menu' | 'game' | 'settings' | 'referrals' | 'shop';

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
    setIsPlaying(true);
    initializeGame();
  }, [tickets, setTickets, setIsPlaying, initializeGame, toast, language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    toast({
      title: "Language Updated",
      description: "Your language preference has been saved",
    });
  };

  const handlePurchaseTickets = (amount: number) => {
    setTickets(prev => prev + amount);
    console.log('Tickets purchased:', amount);
  };

  const handleContinuePlaying = useCallback(() => {
    setGameEnded(false);
    initializeGame();
    console.log('Continuing game with new round');
  }, [initializeGame, setGameEnded]);

  const handleReturnToMenu = useCallback(() => {
    setCurrentView('menu');
    setIsPlaying(false);
    setGameEnded(false);
    console.log('Returning to menu');
  }, [setCurrentView, setIsPlaying, setGameEnded]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A365D] to-[#2C5282] p-4">
      <div className="snowfall" />
      
      <div className="max-w-md mx-auto space-y-4">
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
              onOpenShop={() => handleViewChange('shop')}
              hasTickets={tickets > 0}
              language={language}
            />
          </>
        )}

        {currentView === 'game' && (
          <GameGrid
            grid={grid}
            onMove={handleMove}
            movesLeft={movesLeft}
            isValidMove={isValidMove}
            language={language}
            onReturnToMenu={handleReturnToMenu}
            onContinuePlaying={handleContinuePlaying}
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

        {currentView === 'shop' && (
          <Shop
            walletAddress={walletAddress}
            onPurchaseTickets={handlePurchaseTickets}
            onBack={() => handleViewChange('menu')}
            language={language}
          />
        )}
      </div>
    </div>
  );
};

export default Index;