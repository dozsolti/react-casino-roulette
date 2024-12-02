import React, { useContext } from 'react';
import type { FC } from 'react';

import { RouletteTableContext } from '../../../context';
import { TableLayoutType } from '../../../types';
import { DoubleZero, SingleZero } from './components';

interface IZeroBetsProps {
  layoutType: TableLayoutType;
}

export const ZeroBets: FC<IZeroBetsProps> = ({ layoutType }) => {
  const { bets, chipIcons } = useContext(RouletteTableContext);

  return (
    <>
      <SingleZero layoutType={layoutType} bets={bets} chipIcons={chipIcons} />
      {layoutType == 'american' && <DoubleZero layoutType={layoutType} bets={bets} chipIcons={chipIcons} />}
    </>
  );
};


