import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Language, getTranslation } from '@/utils/language';

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
      // Request transaction approval
      const priceInWei = price * 1e18; // Convert ETH to Wei
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: walletAddress,
          to: '0xYourGameWalletAddress', // Replace with your game's wallet address
          value: priceInWei.toString(16), // Convert to hex
        }],
      });

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

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {getTranslation(language, 'ticketShop')}
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-2">1 {getTranslation(language, 'ticket')}</h3>
          <p className="text-sm text-muted-foreground mb-4">0.01 ETH</p>
          <Button 
            onClick={() => handlePurchase(1, 0.01)}
            disabled={isProcessing || !walletAddress}
            className="w-full"
          >
            {getTranslation(language, 'buy')}
          </Button>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-2">5 {getTranslation(language, 'tickets')}</h3>
          <p className="text-sm text-muted-foreground mb-4">0.045 ETH</p>
          <Button 
            onClick={() => handlePurchase(5, 0.045)}
            disabled={isProcessing || !walletAddress}
            className="w-full"
          >
            {getTranslation(language, 'buy')}
          </Button>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-lg font-semibold mb-2">10 {getTranslation(language, 'tickets')}</h3>
          <p className="text-sm text-muted-foreground mb-4">0.08 ETH</p>
          <Button 
            onClick={() => handlePurchase(10, 0.08)}
            disabled={isProcessing || !walletAddress}
            className="w-full"
          >
            {getTranslation(language, 'buy')}
          </Button>
        </div>
      </div>

      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full mt-6"
      >
        {getTranslation(language, 'backToMenu')}
      </Button>
    </div>
  );
};