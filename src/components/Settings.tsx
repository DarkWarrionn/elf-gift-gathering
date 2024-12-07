import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SettingsProps {
  language: 'en' | 'uk' | 'ru';
  country: string;
  walletAddress: string;
  onLanguageChange: (language: 'en' | 'uk' | 'ru') => void;
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
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Language</label>
        <Select value={language} onValueChange={(value: 'en' | 'uk' | 'ru') => onLanguageChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="uk">Ukrainian</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
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
        <label className="text-sm font-medium">Wallet Address</label>
        <Input
          type="text"
          value={walletAddress}
          onChange={(e) => onWalletConnect(e.target.value)}
          placeholder="Enter your wallet address"
        />
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