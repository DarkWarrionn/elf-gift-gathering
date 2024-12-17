import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag, Settings as SettingsIcon, Users, Gift } from 'lucide-react';

type View = 'menu' | 'game' | 'settings' | 'referrals' | 'shop' | 'leaderboard';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Button
          variant="ghost"
          className={`flex flex-col items-center ${currentView === 'menu' ? 'text-christmas-red' : ''}`}
          onClick={() => onViewChange('menu')}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center ${currentView === 'game' ? 'text-christmas-red' : ''}`}
          onClick={() => onViewChange('game')}
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs">Play</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center ${currentView === 'shop' ? 'text-christmas-red' : ''}`}
          onClick={() => onViewChange('shop')}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs">Shop</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center ${currentView === 'referrals' ? 'text-christmas-red' : ''}`}
          onClick={() => onViewChange('referrals')}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">Referrals</span>
        </Button>
        <Button
          variant="ghost"
          className={`flex flex-col items-center ${currentView === 'settings' ? 'text-christmas-red' : ''}`}
          onClick={() => onViewChange('settings')}
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-xs">Settings</span>
        </Button>
      </div>
    </div>
  );
};