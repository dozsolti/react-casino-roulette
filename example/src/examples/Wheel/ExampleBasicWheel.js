import React, { useState } from 'react';
import { RouletteWheel } from 'react-casino-roulette';
import { getRandomRouletteWinBet } from '../../helpers/getRandomRouletteWinBet'

function ExampleBasicWheel() {

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

    return (
        <>
            <RouletteWheel
                start={wheelStart}
                winningBet={winningBet}
                onSpinningEnd={handleEndSpin}
            />
            <button onClick={doSpin} disabled={wheelStart}>Spin</button>
        </>
    )
}

export default ExampleBasicWheel