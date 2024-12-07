import React from 'react';
import type { FC } from 'react';

import './Chip.css';
import { BetType, IRouletteTableProps } from '../../../types';

export interface IChipProps {
  position:
  | 'center'
  | 'right-top'
  | 'right-bottom'
  | 'center-top'
  | 'right-top-with-offset'
  | 'right-bottom-with-offset'
  | 'right-bottom-with-no-offset'
  | 'right-top-with-no-offset'
  | 'center-bottom'
  | 'left-top'
  | 'right-center';
  icon?: any;
  bet?: BetType;
}

export const Chip: FC<IChipProps> = ({ position, icon, bet }) => {
  if (!bet) return null;

  return (
    <div
      className={`chip ${position}`}
      style={{
        ... (icon ? { backgroundImage: `url("${icon}")` } : {})
      }}
    >
      {bet.amount}
    </div >
  );
};