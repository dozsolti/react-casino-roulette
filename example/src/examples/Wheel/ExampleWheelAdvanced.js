import React, { useState } from 'react';
import { RouletteWheel } from 'react-casino-roulette';
import { getRandomRouletteWinBet } from '../../helpers/getRandomRouletteWinBet'

function ExampleWheelAdvanced() {

    const [layoutType, setLayoutType] = useState('european');
    const [winningBet, setWinningBet] = useState('-1');
    const [wheelStart, setWheelStart] = useState(false);


    const doSpin = () => {
        const winner = getRandomRouletteWinBet();

        console.log("Winner number is:", winner);

        setWinningBet(winner);
        setWheelStart(true);
    }

    const handleEndSpin = (winner) => {
        alert("The ball landed on " + winner);
        setWheelStart(false);
    };

    const toggleLayoutType = () => { setLayoutType(t => t === 'american' ? 'european' : 'american') }

    return (
        <>
            <RouletteWheel
                start={wheelStart}
                winningBet={winningBet}
                onSpinningEnd={handleEndSpin}

                layoutType={layoutType}
                spinLaps={5}
                spinDuration={4}
                spinEaseFunction='cubic-bezier(0.73, 0.03, 0.14, 0.96)'
                automaticSpinning={false}
            />
            <div className='buttons'>
                <button onClick={doSpin} disabled={wheelStart}>Spin</button>
                <button type="button" disabled={wheelStart} onClick={toggleLayoutType}>
                    Switch to {layoutType === 'european' ? 'american' : 'european'}
                </button>
            </div>
        </>
    )
}

export default ExampleWheelAdvanced;