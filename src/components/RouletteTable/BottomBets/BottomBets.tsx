import React from 'react';
import type { FC } from 'react';

import { ACTION_TYPES } from '../../../constants';
import { ChipRenderer } from '../utils/ChipRenderer';

const BOTTOM_BETS = [
  {
    action: ACTION_TYPES['1_TO_18'],
    label: '1-18'
  },
  {
    action: ACTION_TYPES.EVEN,
    label: 'EVEN'
  },
  {
    action: ACTION_TYPES.RED,
    label: <div className="rhomb-red" />
  },
  {
    action: ACTION_TYPES.BLACK,
    label: <div className="rhomb-black" />
  },
  {
    action: ACTION_TYPES.ODD,
    label: 'ODD'
  },
  {
    action: ACTION_TYPES['19_TO_36'],
    label: '19-36'
  },
]
export const BottomBets: FC = () => {

  return (
    <>
      {BOTTOM_BETS.map(x => (
        <ChipRenderer
          cName='outside-section'
          action={x.action}
          highlight={x.action}
          betLabel={x.label}
          chipPosition='center'
        />
      ))}
    </>
  );
};
