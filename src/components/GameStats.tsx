import React from 'react';
import { Coins, Ticket, Users } from 'lucide-react';

interface GameStatsProps {
  coins: number;
  tickets: number;
  referralBonus: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ coins, tickets, referralBonus }) => {
  return (
    <div className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] p-4 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex flex-col items-center space-y-1">
            <Coins className="w-6 h-6 text-yellow-300" />
            <p className="font-bold text-white">{coins}</p>
            <p className="text-xs text-gray-200">Coins</p>
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center space-y-1">
            <Ticket className="w-6 h-6 text-green-300" />
            <p className="font-bold text-white">{tickets}</p>
            <p className="text-xs text-gray-200">Tickets</p>
          </div>
        </div>
        <div className="text-center">
          <div className="flex flex-col items-center space-y-1">
            <Users className="w-6 h-6 text-blue-300" />
            <p className="font-bold text-white">{referralBonus}</p>
            <p className="text-xs text-gray-200">Referral Bonus</p>
          </div>
        </div>
      </div>
    </div>
  );
};