export type Language = 'en' | 'es';

export type TranslationKey =
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
  | 'coins'
  | 'walletRequired'
  | 'connectWallet'
  | 'purchaseSuccess'
  | 'purchaseFailed'
  | 'tryAgain'
  | 'ticketShop'
  | 'ticket'
  | 'tickets'
  | 'ticketsPurchased'
  | 'buy'
  | 'backToMenu';

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
    coins: 'coins',
    walletRequired: 'Wallet Required',
    connectWallet: 'Please connect your wallet in settings first',
    purchaseSuccess: 'Purchase Successful',
    purchaseFailed: 'Purchase Failed',
    tryAgain: 'Please try again',
    ticketShop: 'Ticket Shop',
    ticket: 'Ticket',
    tickets: 'Tickets',
    ticketsPurchased: 'tickets purchased',
    buy: 'Buy',
    backToMenu: 'Back to Menu'
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
    coins: 'monedas',
    walletRequired: 'Billetera Requerida',
    connectWallet: 'Por favor conecta tu billetera en configuración primero',
    purchaseSuccess: 'Compra Exitosa',
    purchaseFailed: 'Compra Fallida',
    tryAgain: 'Por favor intenta de nuevo',
    ticketShop: 'Tienda de Tickets',
    ticket: 'Ticket',
    tickets: 'Tickets',
    ticketsPurchased: 'tickets comprados',
    buy: 'Comprar',
    backToMenu: 'Volver al Menú'
  }
};

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language]?.[key] || key;
};