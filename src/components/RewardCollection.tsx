import React, { useState, useEffect } from 'react';
import { Timer, Gift, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface RewardCollectionProps {
  onCollect: (coins: number, tickets: number) => void;
}

export const RewardCollection: React.FC<RewardCollectionProps> = ({ onCollect }) => {
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [canCollect, setCanCollect] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setCanCollect(true);
          return 3600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCollect = () => {
    if (canCollect) {
      onCollect(50, 1); // 50 coins and 1 ticket per hour
      setCanCollect(false);
      setTimeLeft(3600);
      toast({
        title: "Rewards Collected! 🎉",
        description: "You received 50 coins and 1 ticket!",
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#2C3E50] to-[#3498DB] p-6 rounded-lg shadow-lg mb-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Gift className="text-yellow-300 w-6 h-6" />
          <h3 className="text-white font-bold">Hourly Rewards</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Timer className="text-white w-5 h-5" />
          <span className="text-white">{formatTime(timeLeft)}</span>
        </div>
      </div>
      <Button
        onClick={handleCollect}
        disabled={!canCollect}
        className={`w-full mt-4 ${
          canCollect
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-500"
        }`}
      >
        {canCollect ? (
          <span className="flex items-center">
            Collect Rewards <Gift className="ml-2 w-4 h-4" />
          </span>
        ) : (
          <span className="flex items-center">
            Collected <Check className="ml-2 w-4 h-4" />
          </span>
        )}
      </Button>
    </div>
  );
};