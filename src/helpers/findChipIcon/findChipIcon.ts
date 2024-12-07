import { BetType, Chips } from '../../types';

export const findChipIcon = (bet: BetType, chips: Chips) => {
  if (!bet) return null;

  const icons = Object
    .entries(chips)
    .map(x => ({ minAmount: Number(x[0]), icon: x[1] }));

  if (icons.length == 0) return null;
  if (icons.length == 1) return icons[0].icon;

  let i = 0;
  while (i < icons.length && icons[i].minAmount <= bet.amount)
    i++;

  if (i >= icons.length)
    return icons[icons.length - 1].icon;

  return icons[i - 1].icon;
}
