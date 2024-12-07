import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface ReferralsProps {
  referralBonus: number;
  onEarnBonus: (amount: number) => void;
  onBack: () => void;
}

export const Referrals: React.FC<ReferralsProps> = ({
  referralBonus,
  onEarnBonus,
  onBack,
}) => {
  const [referralLink] = useState(`https://game.com/ref/${Math.random().toString(36).substr(2, 9)}`);
  const { toast } = useToast();

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Referral Stats</h2>
        <p className="text-sm text-gray-600 mb-4">
          Earn 5% of coins from friends you invite!
        </p>
        <div className="mb-4">
          <p className="text-sm font-medium">Total Bonus Earned</p>
          <p className="text-2xl font-bold text-primary">{referralBonus} coins</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Your Referral Link</label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1"
          />
          <Button onClick={copyReferralLink}>
            Copy
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