import React, { useContext } from 'react';
import type { FC } from 'react';

import { RouletteTableContext } from '../../../context';
import { RouletteLayoutType } from '../../../types';
import { DoubleZero, SingleZero } from './components';

interface IZeroBetsProps {
  layoutType: RouletteLayoutType;
}

export const ZeroBets: FC<IZeroBetsProps> = ({ layoutType }) => {
  const { bets, chips } = useContext(RouletteTableContext);

  return (
    <>
      <SingleZero layoutType={layoutType} bets={bets} chips={chips} />
      {layoutType == 'american' && <DoubleZero layoutType={layoutType} bets={bets} chips={chips} />}
    </>
  );
};


