import { BetType, ChipIcons } from '../../components/RouletteTable/types';

export const findChipIcon = (bet: BetType, chipIcons: ChipIcons) => {
  if (!bet) return null;

  const icons = Object
    .entries(chipIcons)
    .map(x => ({ minAmount: Number(x[0]), icon: x[1] }));

  if (icons.length == 0) return null;
  if (icons.length == 1) return icons[0].icon;

  let i = 0;
  while (i < icons.length && icons[i].minAmount <= bet.number)
    i++;

  if (i >= icons.length)
    return icons[icons.length - 1].icon;

  return icons[i - 1].icon;
}
