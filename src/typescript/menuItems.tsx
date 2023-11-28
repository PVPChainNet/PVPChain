interface MenuItem {
  name: string;
  link: string;
}

interface MenuItemGame {
  name: string;
  link: string;
  image: string;
  icon: string;
}

export const menuItemsPVP: MenuItemGame[] = [
  {
    name: 'Russian Roulette',
    link: '/russianroulette',
    image: '/images/games/russian_roulette/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
  {
    name: 'Winner Takes All',
    link: '/winnertakesall',
    image: '/images/games/winner_takes_all/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
  {
    name: 'Prediction Market',
    link: '/predictionmarket',
    image: '/images/games/prediction_market/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
];
export const menuItemsPVH: MenuItemGame[] = [
  {
    name: 'Wheel of Fortune',
    link: '/wheeloffortune',
    image: '/images/games/russian_roulette/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
  {
    name: 'Slots',
    link: '/slots',
    image: '/images/games/russian_roulette/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
  {
    name: 'Coin Flip',
    link: '/coinflip',
    image: '/images/games/russian_roulette/background.png',
    icon: '/images/games/russian_roulette/icon.png',
  },
];
export const menuItemsLottery: MenuItem[] = [{name: 'Play Lottery', link: '/lottery'}];
export const menuItemsRevenue: MenuItem[] = [{name: 'Join Pool', link: '/revenuepool'}];
export const menuItemsHouse: MenuItem[] = [{name: 'The House', link: '/thehouse'}];
