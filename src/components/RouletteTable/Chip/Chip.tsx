import React from 'react';
import type { FC } from 'react';

import './Chip.css';
import { IRouletteTableProps } from '../RouletteTable';

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
  icon?: string;
  bet?: IRouletteTableProps['bets'][string];
}

export const Chip: FC<IChipProps> = ({ position, icon, bet }) => {
  if (!icon)
    icon = bet?.icon;

  return (
    <div
      className={`chip ${position}`}
      style={{
        ... (icon ? { backgroundImage: `url("${icon}")` } : {})
      }}
    >
      {bet?.number}
    </div >
  );
};

Chip.defaultProps = {
  icon: undefined,
};
