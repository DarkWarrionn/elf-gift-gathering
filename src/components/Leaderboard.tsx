import React from 'react';
import { Button } from "@/components/ui/button";
import { Language, getTranslation } from '@/utils/language';
import { Trophy, ArrowLeft } from 'lucide-react';

interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
}

interface LeaderboardProps {
  onBack: () => void;
  language: Language;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack, language }) => {
  // Mock data - replace with actual data from your backend
  const leaderboardData: LeaderboardEntry[] = [
    { address: '0x1234...5678', score: 1000, rank: 1 },
    { address: '0x8765...4321', score: 800, rank: 2 },
    { address: '0x9876...1234', score: 600, rank: 3 },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold text-center text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          {getTranslation(language, 'leaderboard')}
        </h2>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      <div className="space-y-4">
        {leaderboardData.map((entry) => (
          <div
            key={entry.address}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className={`text-xl font-bold ${
                entry.rank === 1 ? 'text-yellow-400' :
                entry.rank === 2 ? 'text-gray-300' :
                entry.rank === 3 ? 'text-amber-600' : 'text-white'
              }`}>
                #{entry.rank}
              </span>
              <span className="text-white truncate max-w-[150px]">
                {entry.address}
              </span>
            </div>
            <span className="text-white font-bold">
              {entry.score} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};