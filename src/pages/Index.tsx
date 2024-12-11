import React, { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useGameState } from '@/hooks/useGameState';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { Layout } from '@/components/Layout';
import { MainMenu } from '@/components/MainMenu';
import { GameGrid } from '@/components/GameGrid';
import { Settings } from '@/components/Settings';
import { Referrals } from '@/components/Referrals';
import { Shop } from '@/components/Shop';
import { RewardCollection } from '@/components/RewardCollection';
import { TaskList } from '@/components/TaskList';
import { Language, getTranslation } from '@/utils/language';

type View = 'menu' | 'game' | 'settings' | 'referrals' | 'shop';

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
  } = useGameState('elfGameState');

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

  const renderContent = () => {
    switch (currentView) {
      case 'menu':
        return (
          <>
            <RewardCollection onCollect={handleRewardCollection} />
            <TaskList onComplete={handleTaskComplete} />
            <MainMenu
              onStartGame={startGame}
              onOpenSettings={() => handleViewChange('settings')}
              onOpenReferrals={() => handleViewChange('referrals')}
              onOpenShop={() => handleViewChange('shop')}
              hasTickets={tickets > 0}
              language={language}
            />
          </>
        );
      case 'game':
        return (
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
        );
      case 'settings':
        return (
          <Settings
            language={language}
            country={country}
            walletAddress={walletAddress}
            onLanguageChange={handleLanguageChange}
            onCountryChange={handleCountryChange}
            onWalletConnect={handleWalletConnect}
            onBack={() => handleViewChange('menu')}
          />
        );
      case 'referrals':
        return (
          <Referrals
            referralBonus={referralBonus}
            onEarnBonus={handleReferralBonus}
            onBack={() => handleViewChange('menu')}
          />
        );
      case 'shop':
        return (
          <Shop
            walletAddress={walletAddress}
            onPurchaseTickets={handlePurchaseTickets}
            onBack={() => handleViewChange('menu')}
            language={language}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      coins={coins}
      tickets={tickets}
      referralBonus={referralBonus}
      currentView={currentView}
      onViewChange={setCurrentView}
    >
      {renderContent()}
    </Layout>
  );
};

export default Index;