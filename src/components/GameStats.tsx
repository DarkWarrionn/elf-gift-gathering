import React from 'react';

interface GameStatsProps {
  coins: number;
  tickets: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ coins, tickets }) => {
  return (
    <div className="flex justify-around w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <span className="text-2xl">💰</span>
        <p className="font-bold text-primary">{coins}</p>
        <p className="text-sm text-gray-600">Coins</p>
      </div>
      <div className="text-center">
        <span className="text-2xl">🎟️</span>
        <p className="font-bold text-primary">{tickets}</p>
        <p className="text-sm text-gray-600">Tickets</p>
      </div>
    </div>
  );
};