interface MenuItem {
  name: string;
  link: string;
}

export const menuItemsPVP: MenuItem[] = [
  {name: 'Russian Roulette', link: '/roulette'},
  {name: 'Winner Takes All', link: '/winnertakesall'},
  {name: 'Prediction Market', link: '/predictionmarket'},
];
export const menuItemsPVH: MenuItem[] = [
  {name: 'Wheel of Fortune', link: '/wheeloffortune'},
  {name: 'Slots', link: '/slots'},
  {name: 'Coin Flip', link: '/coinflip'},
];
export const menuItemsLottery: MenuItem[] = [{name: 'Play Lottery', link: '/lottery'}];
export const menuItemsRevenue: MenuItem[] = [{name: 'Join Pool', link: '/revenuepool'}];
export const menuItemsHouse: MenuItem[] = [{name: 'The House', link: '/thehouse'}];
