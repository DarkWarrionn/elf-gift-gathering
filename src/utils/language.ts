export type Language = 'en' | 'es';

type TranslationKey = 
  | 'startGame'
  | 'leaderboard'
  | 'shop'
  | 'referrals'
  | 'settings'
  | 'movesLeft'
  | 'returnToMenu'
  | 'continuePlaying'
  | 'gameOver'
  | 'thanks'
  | 'noTickets'
  | 'purchaseTickets'
  | 'rewardsCollected'
  | 'coins';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    startGame: 'Start Game',
    leaderboard: 'Leaderboard',
    shop: 'Shop',
    referrals: 'Referrals',
    settings: 'Settings',
    movesLeft: 'Moves Left',
    returnToMenu: 'Return to Menu',
    continuePlaying: 'Continue Playing',
    gameOver: 'Game Over',
    thanks: 'Thanks for playing!',
    noTickets: 'No tickets available',
    purchaseTickets: 'Please purchase tickets to continue playing',
    rewardsCollected: 'Rewards Collected',
    coins: 'coins'
  },
  es: {
    startGame: 'Iniciar Juego',
    leaderboard: 'Tabla de Posiciones',
    shop: 'Tienda',
    referrals: 'Referencias',
    settings: 'Configuración',
    movesLeft: 'Movimientos Restantes',
    returnToMenu: 'Volver al Menú',
    continuePlaying: 'Continuar Jugando',
    gameOver: 'Juego Terminado',
    thanks: '¡Gracias por jugar!',
    noTickets: 'No hay tickets disponibles',
    purchaseTickets: 'Por favor compra tickets para continuar jugando',
    rewardsCollected: 'Recompensas Recolectadas',
    coins: 'monedas'
  }
};

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language][key];
};