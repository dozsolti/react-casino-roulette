import React, { useState } from 'react';
import { ChipList, RouletteWheel, RouletteTable, useRoulette } from 'react-casino-roulette';

import whiteChip from '../../public/images/blank-chips/white-chip.png';
import blueChip from '../../public/images/blank-chips/blue-chip.png';
import blackChip from '../../public/images/blank-chips/black-chip.png';
import cyanChip from '../../public/images/blank-chips/cyan-chip.png';
import { getRandomRouletteWinBet } from '../helpers/getRandomRouletteWinBet'

const chips = {
    '1': whiteChip,
    '10': blueChip,
    '100': blackChip,
    '500': cyanChip,
}

function BasicExample() {
    const { bets, total, onBet, clearBets } = useRoulette();

    const [selectedChip, setSelectedChip] = useState(Object.keys(chips)[0]);
    const [winningBet, setWinningBet] = useState('-1');
    const [wheelStart, setWheelStart] = useState(false);


    const doSpin = () => {
        const winner = getRandomRouletteWinBet();

        setWinningBet(winner);
        setWheelStart(true);
    }

    const handleEndSpin = (winner) => {
        alert("The ball landed on " + winner);
        setWheelStart(false);
    };

    return (
        <>
            <RouletteWheel
                start={wheelStart}
                winningBet={winningBet}
                onSpinningEnd={handleEndSpin}
            />

            <pre>Total: ${total}</pre>
            <RouletteTable chips={chips} bets={bets} onBet={onBet(selectedChip)} readOnly={wheelStart} />
            <ChipList
                chips={chips}
                selectedChip={selectedChip}
                onChipPressed={setSelectedChip} />

            <div className='buttons'>
                <button onClick={clearBets} disabled={wheelStart}>Clear</button>
                <button onClick={doSpin} disabled={wheelStart}>Spin</button>
            </div>

        </>
    )
}

export default BasicExample