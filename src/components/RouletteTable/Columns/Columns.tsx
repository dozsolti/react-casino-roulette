import React from 'react';
import type { FC } from 'react';

import { ACTION_TYPES } from '../../../constants';
import { ChipRenderer } from '../utils/ChipRenderer';

const COLUMNS = [
  {
    action: ACTION_TYPES['1ST_COLUMN'],
    label: '1st'
  },
  {
    action: ACTION_TYPES['2ND_COLUMN'],
    label: '2nd'
  },
  {
    action: ACTION_TYPES['3RD_COLUMN'],
    label: '3rd'
  },
]

export const Columns: FC = () => {

  return (
    <>
      {COLUMNS.map(x => (
        <ChipRenderer
          cName='column-item'
          action={x.action}
          highlight={x.action}
          betLabel={x.label}
          chipPosition='center'
        />
      ))}
    </>
  );
};
