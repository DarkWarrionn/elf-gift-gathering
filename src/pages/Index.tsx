import React, { useState, useCallback } from 'react';
import { GameGrid } from '@/components/GameGrid';
import { GameStats } from '@/components/GameStats';
import { MainMenu } from '@/components/MainMenu';
import { Settings } from '@/components/Settings';
import { Referrals } from '@/components/Referrals';
import { Shop } from '@/components/Shop';
import { RewardCollection } from '@/components/RewardCollection';
import { TaskList } from '@/components/TaskList';
import { useToast } from "@/hooks/use-toast";
import { useGameState } from '@/hooks/useGameState';
import { useGameHandlers } from '@/hooks/useGameHandlers';
import { Language, getTranslation } from '@/utils/language';
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Settings as SettingsIcon, Users, Gift } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-[#1A365D] to-[#2C5282] p-4 pb-20">
      <div className="snowfall absolute inset-0 pointer-events-none" />
      
      <div className="max-w-md mx-auto space-y-4">
        <GameStats 
          coins={coins} 
          tickets={tickets} 
          referralBonus={referralBonus}
        />

        {/* Main Content */}
        <div className="min-h-[calc(100vh-300px)]">
          {currentView === 'menu' && (
            <>
              <RewardCollection onCollect={handleRewardCollection} />
              <TaskList onComplete={handleTaskComplete} />
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

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <Button
              variant="ghost"
              className={`flex flex-col items-center ${currentView === 'menu' ? 'text-christmas-red' : ''}`}
              onClick={() => handleViewChange('menu')}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center ${currentView === 'game' ? 'text-christmas-red' : ''}`}
              onClick={() => handleViewChange('game')}
            >
              <Gift className="w-6 h-6" />
              <span className="text-xs">Play</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center ${currentView === 'shop' ? 'text-christmas-red' : ''}`}
              onClick={() => handleViewChange('shop')}
            >
              <ShoppingBag className="w-6 h-6" />
              <span className="text-xs">Shop</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center ${currentView === 'referrals' ? 'text-christmas-red' : ''}`}
              onClick={() => handleViewChange('referrals')}
            >
              <Users className="w-6 h-6" />
              <span className="text-xs">Referrals</span>
            </Button>
            <Button
              variant="ghost"
              className={`flex flex-col items-center ${currentView === 'settings' ? 'text-christmas-red' : ''}`}
              onClick={() => handleViewChange('settings')}
            >
              <SettingsIcon className="w-6 h-6" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
