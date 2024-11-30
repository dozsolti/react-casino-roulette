import { createContext } from 'react';
import type { MouseEvent } from 'react';

import type { IRouletteTableProps } from '../components/RouletteTable';
import { ChipIcons } from '../components/RouletteTable/types';

export interface IRouletteTableContextProps {
  bets: IRouletteTableProps['bets'];
  onBetCatcherHover: (event: MouseEvent<HTMLDivElement>) => void;
  chipIcons: ChipIcons;
}

export const RouletteTableContext = createContext({
  bets: {},
  onBetCatcherHover: () => null,
  chipIcons: {},
} as IRouletteTableContextProps);
