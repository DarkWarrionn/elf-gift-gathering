import React from 'react';
import { GameStats } from '@/components/GameStats';
import { Navigation } from '@/components/Navigation';

type View = 'menu' | 'game' | 'settings' | 'referrals' | 'shop' | 'leaderboard';

interface LayoutProps {
  children: React.ReactNode;
  coins: number;
  tickets: number;
  referralBonus: number;
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  coins,
  tickets,
  referralBonus,
  currentView,
  onViewChange
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A365D] to-[#2C5282] p-4 pb-20">
      <div className="snowfall absolute inset-0 pointer-events-none" />
      <div className="max-w-md mx-auto space-y-4">
        <GameStats 
          coins={coins} 
          tickets={tickets} 
          referralBonus={referralBonus}
        />
        <div className="min-h-[calc(100vh-300px)]">
          {children}
        </div>
        <Navigation currentView={currentView} onViewChange={onViewChange} />
      </div>
    </div>
  );
};