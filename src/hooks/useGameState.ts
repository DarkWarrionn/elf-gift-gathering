import { useState, useEffect } from 'react';
import { CellContent } from '@/types/game';
import { Language } from '@/utils/language';

export const useGameState = (storageKey: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [grid, setGrid] = useState<CellContent[][]>([]);
  const [elfPosition, setElfPosition] = useState<[number, number]>([0, 0]);
  const [movesLeft, setMovesLeft] = useState(0);
  const [coins, setCoins] = useState(0);
  const [tickets, setTickets] = useState(3);
  const [referralBonus, setReferralBonus] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [country, setCountry] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [gameEnded, setGameEnded] = useState(false);

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      const {
        coins: savedCoins,
        tickets: savedTickets,
        referralBonus: savedBonus,
        language: savedLanguage,
        country: savedCountry,
        walletAddress: savedWallet
      } = JSON.parse(savedState);

      setCoins(savedCoins);
      setTickets(savedTickets);
      setReferralBonus(savedBonus);
      setLanguage(savedLanguage);
      setCountry(savedCountry);
      setWalletAddress(savedWallet);
    }
  }, [storageKey]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({
      coins,
      tickets,
      referralBonus,
      language,
      country,
      walletAddress
    }));
  }, [coins, tickets, referralBonus, language, country, walletAddress, storageKey]);

  return {
    isPlaying,
    grid,
    elfPosition,
    movesLeft,
    coins,
    tickets,
    referralBonus,
    language,
    country,
    walletAddress,
    gameEnded,
    setIsPlaying,
    setGrid,
    setElfPosition,
    setMovesLeft,
    setCoins,
    setTickets,
    setReferralBonus,
    setLanguage,
    setCountry,
    setWalletAddress,
    setGameEnded
  };
};