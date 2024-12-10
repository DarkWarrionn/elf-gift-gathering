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
      const transaction = {
        to: 'EQYour_Game_TON_Address_Here',
        value: price * 1000000000,
        payload: 'Purchase game tickets'
      };

      await window.ton.send('ton_sendTransaction', [transaction]);

      onPurchaseTickets(amount);
      toast({
        title: getTranslation(language, 'purchaseSuccess'),
        description: `${amount} ${getTranslation(language, 'ticketsPurchased')}!`,
      });
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
    { amount: 1, price: 0.02, icon: Gift },
    { amount: 5, price: 0.08, icon: Gift },
    { amount: 10, price: 0.14, icon: Gift },
    { amount: 100, price: 1.2, icon: Sparkles },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        {getTranslation(language, 'ticketShop')} 🎄
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {shopItems.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-green-700">
                {item.amount} {getTranslation(language, item.amount === 1 ? 'ticket' : 'tickets')}
              </h3>
              <item.icon className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-sm text-green-600 mb-4">{item.price} TON</p>
            <Button 
              onClick={() => handlePurchase(item.amount, item.price)}
              disabled={isProcessing || !walletAddress}
              className="w-full bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white"
            >
              {getTranslation(language, 'buy')}
            </Button>
          </div>
        ))}
      </div>

      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full mt-6 border-red-300 text-green-700 hover:bg-red-50"
      >
        {getTranslation(language, 'backToMenu')}
      </Button>
    </div>
  );
};