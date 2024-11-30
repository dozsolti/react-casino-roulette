import React from 'react';
import type { FC } from 'react';


import { ACTION_TYPES } from '../../../constants';
import { ChipRenderer } from '../utils/ChipRenderer';

const DOZENS = [
  {
    action: ACTION_TYPES['1ST_DOZEN'],
    label: '1-12'
  },
  {
    action: ACTION_TYPES['2ND_DOZEN'],
    label: '13-24'
  },
  {
    action: ACTION_TYPES['3RD_DOZEN'],
    label: '25-36'
  },
]
export const Dozens: FC = () => {
  return (
    <>
      {DOZENS.map(x => (
        <ChipRenderer
          cName='doz-item'
          action={x.action}
          highlight={x.action}
          betLabel={x.label}
          chipPosition='center'
          key={x.action}
        />
      ))}
    </>
  );
};
