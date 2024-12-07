import React, { useEffect, useState, useRef } from 'react';
import { calculateDefaultRotation, calculateSpinToRotation, getWheelNumbers } from '../../helpers';
import { classNames } from '../../libs';

import './RouletteWheel.css';
import './RouletteWheelNumbers.css';
import { IRouletteWheelProps } from '../../types';

export const RouletteWheel: React.FC<IRouletteWheelProps> = ({
  start,
  winningBet,
  onSpinningEnd,

  layoutType = 'european',
  automaticSpinning = true,

  spinLaps = 3,
  spinDuration = 3,
  spinEaseFunction = 'ease-out',
}) => {

  const [wheelNumbers, setWheelNumbers] = useState<string[]>([]);

  const numberListRef = useRef<HTMLUListElement>(null);

  function doSpin() {
    const listElement = numberListRef.current;

    if (listElement == null || winningBet === '-1') return;

    listElement.removeAttribute('data-spintoindex');

    const betIndex = wheelNumbers.indexOf(winningBet);

    // Wait a bit for the ball to reset it's state. Otherwise the spinning will continue from the current position.
    setTimeout(() => {
      listElement.setAttribute('data-spintoindex', `${betIndex}`);

      listElement.style.setProperty('--wheel-rotation-function', spinEaseFunction);
      listElement.style.setProperty('--wheel-rotation-duration', spinDuration + 's');
      listElement.style.setProperty('--wheel-rotation', calculateSpinToRotation(layoutType, betIndex, spinLaps) + 'deg');

      setTimeout(() => {
        onSpinningEnd?.(winningBet);
      }, spinDuration * 1000);
    }, 100);

  }

  useEffect(() => {
    setWheelNumbers(getWheelNumbers(layoutType));
  }, [layoutType]);

  useEffect(() => {
    if (winningBet === '-1' || start === false) {
      return;
    }

    doSpin();
  }, [winningBet, start]);

  return (
    <div className="roulette-wheel-container">
      <div className={classNames('roulette-wheel-plate', { 'automatic-spinning': automaticSpinning })}>
        <ul className={`roulette-wheel-inner ${layoutType}`} ref={numberListRef}>
          {wheelNumbers.map((number, index) => (
            <li
              key={`wheel-${number}`}
              data-bet={number}
              className="roulette-wheel-bet-number"
              style={{
                transform: `rotateZ(${calculateDefaultRotation(layoutType, index)}deg)`,
              }}
            >
              <label htmlFor={`wheel-pit-${number}`}>
                <input
                  type="radio"
                  name="pit"
                  id={`wheel-pit-${number}`}
                  defaultValue={number}
                />
                <span className="roulette-wheel-pit">{number}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};