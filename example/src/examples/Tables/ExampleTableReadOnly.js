import React, { useEffect } from 'react';
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

function ExampleTableReadOnly() {
  const { bets, updateAllBets } = useRoulette();

  useEffect(() => {
    updateAllBets({ 0: 1, 'EVEN': 25, "14-15": 10 })
  }, [])

  return (
    <RouletteTable chips={chips} bets={bets} readOnly={true} />
  )
}

export default ExampleTableReadOnly