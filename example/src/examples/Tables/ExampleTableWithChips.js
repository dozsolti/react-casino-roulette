import React, { useState } from 'react';
import { ChipList, RouletteTable, useRoulette } from 'react-casino-roulette';

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

function ExampleTableWithChips() {
  const { bets, total, onBet, clearBets } = useRoulette();

  const [selectedChip, setSelectedChip] = useState(Object.keys(chips)[0]);

  return (
    <>
      <RouletteTable chips={chips} bets={bets} onBet={onBet(selectedChip)} />
      <ChipList
        chips={chips}
        selectedChip={selectedChip}
        onChipPressed={setSelectedChip} />
      <pre>Total: ${total}. bets: {JSON.stringify(bets)}</pre>
      <button onClick={clearBets}>Clear</button>
    </>
  )
}

export default ExampleTableWithChips;