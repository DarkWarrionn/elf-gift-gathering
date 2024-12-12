import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Language, getTranslation } from '@/utils/language';

interface MainMenuProps {
  onStartGame: () => void;
  onOpenSettings: () => void;
  onOpenReferrals: () => void;
  onOpenShop: () => void;
  onOpenLeaderboard: () => void;
  hasTickets: boolean;
  language: Language;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  onStartGame, 
  onOpenSettings,
  onOpenReferrals,
  onOpenShop,
  onOpenLeaderboard,
  hasTickets,
  language
}) => {
  const { toast } = useToast();

  const handleStartGame = () => {
    if (!hasTickets) {
      toast({
        title: getTranslation(language, 'noTickets'),
        description: getTranslation(language, 'purchaseTickets'),
        variant: "destructive",
      });
      return;
    }
    onStartGame();
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <Button 
        onClick={handleStartGame}
        className="bg-primary hover:bg-primary/90"
      >
        {getTranslation(language, 'startGame')}
      </Button>
      <Button
        variant="secondary"
        className="bg-secondary hover:bg-secondary/90"
        onClick={onOpenLeaderboard}
      >
        {getTranslation(language, 'leaderboard')}
      </Button>
      <Button
        onClick={onOpenShop}
        variant="outline"
        className="border-accent text-accent hover:bg-accent/10"
      >
        {getTranslation(language, 'shop')}
      </Button>
      <Button
        onClick={onOpenReferrals}
        variant="outline"
        className="border-accent text-accent hover:bg-accent/10"
      >
        {getTranslation(language, 'referrals')}
      </Button>
      <Button
        onClick={onOpenSettings}
        variant="outline"
        className="border-accent text-accent hover:bg-accent/10"
      >
        {getTranslation(language, 'settings')}
      </Button>
    </div>
  );
};