import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MainMenuProps {
  onStartGame: () => void;
  hasTickets: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, hasTickets }) => {
  const { toast } = useToast();

  const handleStartGame = () => {
    if (!hasTickets) {
      toast({
        title: "No tickets available",
        description: "Please purchase tickets to play the game",
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
        🎮 Start Game
      </Button>
      <Button
        variant="secondary"
        className="bg-secondary hover:bg-secondary/90"
      >
        🏆 Leaderboard
      </Button>
      <Button
        variant="outline"
        className="border-accent text-accent hover:bg-accent/10"
      >
        🛍️ Shop
      </Button>
    </div>
  );
};