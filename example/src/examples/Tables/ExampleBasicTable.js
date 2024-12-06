import React from 'react';
import { RouletteTable, useRoulette } from 'react-casino-roulette';

import whiteChip from '../../../public/images/blank-chips/white-chip.png';
import blueChip from '../../../public/images/blank-chips/blue-chip.png';
import blackChip from '../../../public/images/blank-chips/black-chip.png';
import cyanChip from '../../../public/images/blank-chips/cyan-chip.png';

const chips = {
  '1': whiteChip,
  '10': blueChip,
  '100': blackChip,
  '500': cyanChip,
}

function ExampleBasicTable() {
  const { bets, onBet } = useRoulette();

  return (
    <RouletteTable chips={chips} bets={bets} onBet={onBet(5)} />
  )
}

export default ExampleBasicTable