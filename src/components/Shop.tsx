import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Language, getTranslation } from '@/utils/language';
import { Gift, Sparkles } from 'lucide-react';

interface ShopProps {
  walletAddress: string;
  onPurchaseTickets: (amount: number) => void;
  onBack: () => void;
  language: Language;
}

export const Shop: React.FC<ShopProps> = ({
  walletAddress,
  onPurchaseTickets,
  onBack,
  language
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async (amount: number, price: number) => {
    if (!walletAddress) {
      toast({
        title: getTranslation(language, 'walletRequired'),
        description: getTranslation(language, 'connectWallet'),
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onPurchaseTickets(amount);
      toast({
        title: getTranslation(language, 'purchaseSuccess'),
        description: `${amount} ${getTranslation(language, 'ticketsPurchased')}!`,
      });
      
      console.log('Tickets purchased:', amount);
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: getTranslation(language, 'purchaseFailed'),
        description: getTranslation(language, 'tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const shopItems = [
    { amount: 1, price: 0.0008, icon: Gift },
    { amount: 5, price: 0.0032, icon: Gift },
    { amount: 10, price: 0.0056, icon: Gift },
    { amount: 100, price: 0.048, icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        {getTranslation(language, 'ticketShop')} 🎄
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {shopItems.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">
                {item.amount} {getTranslation(language, item.amount === 1 ? 'ticket' : 'tickets')}
              </h3>
              <item.icon className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-sm text-gray-300 mb-4">{item.price} TON</p>
            <Button 
              onClick={() => handlePurchase(item.amount, item.price)}
              disabled={isProcessing || !walletAddress}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              {getTranslation(language, 'buy')}
            </Button>
          </div>
        ))}
      </div>

      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full mt-6 border-white text-white hover:bg-white/10"
      >
        {getTranslation(language, 'backToMenu')}
      </Button>
    </div>
  );
};