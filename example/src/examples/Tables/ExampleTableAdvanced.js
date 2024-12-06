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

function ExampleTableAdvanced() {
  const { bets, total, onBet, updateBets, clearBets, removeBet } = useRoulette();

  const [selectedChip, setSelectedChip] = useState(Object.keys(chips)[0]);
  const [mode, setMode] = useState('add')

  const toggleModes = () => {
    setMode(m => m === 'add' ? 'remove' : 'add')
  }

  const loadBets = () => {
    const SAMPLE_BETS = {
      "0": 1,
      'RED': 25,
      "13-14-16-17": 13,
      "26-27-29-30": 1,
      "3RD_DOZEN": 456,
      "EVEN": 20,
      'ODD': 0
    }
    updateBets(SAMPLE_BETS)
  }

  return (
    <>
      <RouletteTable layoutType='american' chips={chips} bets={bets} onBet={onBet(selectedChip, mode)} />
      <ChipList
        chips={chips}
        selectedChip={selectedChip}
        onChipPressed={setSelectedChip} />
      <pre>Total: ${total}</pre>

      <pre>Bets:<br />{(
        Object.entries(bets).map(([betId, data]) => `   ${betId}: ${JSON.stringify(data)}`).join('\n')
      )}</pre>

      <div className='buttons'>
        <button onClick={toggleModes}>Switch to {mode === 'add' ? 'remove' : 'add'} chips</button>
        <button onClick={clearBets}>Clear</button>
        <button onClick={() => removeBet('EVEN')}>Remove bets from "EVEN"</button>
        <button onClick={loadBets}>Load saved bets</button>
      </div>
    </>
  )
}

export default ExampleTableAdvanced;