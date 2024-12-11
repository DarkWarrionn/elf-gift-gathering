import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Language } from '@/utils/language';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface SettingsProps {
  language: Language;
  country: string;
  walletAddress: string;
  onLanguageChange: (language: Language) => void;
  onCountryChange: (country: string) => void;
  onWalletConnect: (address: string) => void;
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  language,
  country,
  walletAddress,
  onLanguageChange,
  onCountryChange,
  onWalletConnect,
  onBack,
}) => {
  const { toast } = useToast();
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  const wallets = [
    { id: 'tonkeeper', name: 'Tonkeeper', icon: '💎' },
    { id: 'mytonwallet', name: 'MyTonWallet', icon: '⭐' },
    { id: 'tonhub', name: 'Tonhub', icon: '💫' },
    { id: 'bitget', name: 'Bitget Wallet', icon: '🔷' },
  ];

  const handleConnectWallet = async (walletId: string) => {
    try {
      if (typeof window.ton !== 'undefined') {
        const { address } = await window.ton.send('ton_requestAccounts');
        onWalletConnect(address);
        setIsWalletDialogOpen(false);
        toast({
          title: "Wallet Connected",
          description: "Your TON wallet has been successfully connected!",
        });
      } else {
        toast({
          title: "Wallet Required",
          description: "Please install a TON wallet to connect",
          variant: "destructive",
        });
        window.open('https://tonkeeper.com', '_blank');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Language</label>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Country</label>
        <Input
          type="text"
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          placeholder="Enter your country"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">TON Wallet</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={walletAddress}
            readOnly
            placeholder="Connect your TON wallet"
            className="flex-1"
          />
          <Button 
            onClick={() => setIsWalletDialogOpen(true)}
            variant="outline"
          >
            {walletAddress ? 'Change Wallet' : 'Connect Wallet'}
          </Button>
        </div>
      </div>

      <Button 
        onClick={onBack}
        variant="outline"
        className="w-full"
      >
        Back to Menu
      </Button>

      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Connect your wallet</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              Select your wallet to connect
            </p>
            <div className="grid grid-cols-2 gap-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-24 hover:bg-accent"
                  onClick={() => handleConnectWallet(wallet.id)}
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <span className="text-sm font-medium">{wallet.name}</span>
                </Button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className="absolute right-4 top-4"
            onClick={() => setIsWalletDialogOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};