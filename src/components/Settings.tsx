import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Language } from '@/utils/language';

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

  const handleConnectWallet = async () => {
    try {
      // Check if TON wallet (Tonkeeper) is installed
      if (typeof window.ton !== 'undefined') {
        // Request wallet connection
        const { address } = await window.ton.send('ton_requestAccounts');
        onWalletConnect(address);
        toast({
          title: "Wallet Connected",
          description: "Your TON wallet has been successfully connected!",
        });
      } else {
        toast({
          title: "Tonkeeper Required",
          description: "Please install Tonkeeper wallet to connect",
          variant: "destructive",
        });
        // Open Tonkeeper website in a new tab
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
        <label className="text-sm font-medium">TON Wallet Address</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={walletAddress}
            readOnly
            placeholder="Connect your TON wallet"
            className="flex-1"
          />
          <Button 
            onClick={handleConnectWallet}
            variant="outline"
          >
            {walletAddress ? 'Connected' : 'Connect Wallet'}
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
    </div>
  );
};
