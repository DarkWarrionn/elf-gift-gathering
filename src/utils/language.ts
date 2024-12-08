export type Language = 'en' | 'uk' | 'ru';

export const translations = {
  en: {
    startGame: '🎮 Start Game',
    leaderboard: '🏆 Leaderboard',
    shop: '🛍️ Shop',
    referrals: '👥 Referrals',
    settings: '⚙️ Settings',
    movesLeft: 'Moves left',
    returnToMenu: 'Return to Menu',
    gameOver: 'Game Over!',
    thanks: 'Thanks for playing!',
    noTickets: 'No tickets available',
    purchaseTickets: 'Please purchase tickets to play',
    rewardsCollected: 'Rewards Collected! 🎉',
    coins: 'Coins',
    tickets: 'Tickets',
    referralBonus: 'Referral Bonus'
  },
  uk: {
    startGame: '🎮 Почати гру',
    leaderboard: '🏆 Таблиця лідерів',
    shop: '🛍️ Магазин',
    referrals: '👥 Реферали',
    settings: '⚙️ Налаштування',
    movesLeft: 'Залишилось ходів',
    returnToMenu: 'Повернутися до меню',
    gameOver: 'Гра закінчена!',
    thanks: 'Дякуємо за гру!',
    noTickets: 'Немає квитків',
    purchaseTickets: 'Будь ласка, придбайте квитки для гри',
    rewardsCollected: 'Нагороди зібрані! 🎉',
    coins: 'Монети',
    tickets: 'Квитки',
    referralBonus: 'Реферальний бонус'
  },
  ru: {
    startGame: '🎮 Начать игру',
    leaderboard: '🏆 Таблица лидеров',
    shop: '🛍️ Магазин',
    referrals: '👥 Рефералы',
    settings: '⚙️ Настройки',
    movesLeft: 'Осталось ходов',
    returnToMenu: 'Вернуться в меню',
    gameOver: 'Игра окончена!',
    thanks: 'Спасибо за игру!',
    noTickets: 'Нет билетов',
    purchaseTickets: 'Пожалуйста, купите билеты для игры',
    rewardsCollected: 'Награды собраны! 🎉',
    coins: 'Монеты',
    tickets: 'Билеты',
    referralBonus: 'Реферальный бонус'
  }
};

export const getTranslation = (language: Language, key: keyof typeof translations.en) => {
  return translations[language][key];
};