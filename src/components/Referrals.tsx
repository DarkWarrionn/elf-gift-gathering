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
  // Generate a unique referral code based on timestamp and random string
  const [referralCode] = useState(() => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomStr}`;
  });

  const referralLink = `${window.location.origin}/invite/${referralCode}`;
  const { toast } = useToast();

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Share this link with friends to earn rewards!",
      });
      
      // Simulate earning bonus (5 tickets) for demonstration
      onEarnBonus(5);
      toast({
        title: "Bonus Earned!",
        description: "You received 5 tickets for sharing!",
      });
      
      console.log('Referral link copied:', referralLink);
    } catch (err) {
      console.error('Failed to copy referral link:', err);
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Your Referral Stats</h2>
        <p className="text-sm text-gray-600 mb-4">
          Share your link and earn 5 tickets for each friend who joins!
        </p>
        <div className="mb-4">
          <p className="text-sm font-medium">Total Bonus Earned</p>
          <p className="text-2xl font-bold text-primary">{referralBonus} tickets</p>
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