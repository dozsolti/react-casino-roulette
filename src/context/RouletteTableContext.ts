import { createContext } from 'react';
import type { MouseEvent } from 'react';

import { Chips, IRouletteTableProps } from '../types';

export interface IRouletteTableContextProps {
  bets: IRouletteTableProps['bets'];
  onBetCatcherHover: (event: MouseEvent<HTMLDivElement>) => void;
  chips: Chips;
}

export const RouletteTableContext = createContext({
  bets: {},
  onBetCatcherHover: () => null,
  chips: {},
} as IRouletteTableContextProps);
