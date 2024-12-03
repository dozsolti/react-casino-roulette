import React, { useEffect, useState, useRef } from 'react';
import type { FC } from 'react';

import config from '../../config/table.json';

import { classNames } from '../../libs';

import './RouletteWheel.css';

import { RouletteLayoutType } from '../../types';
import { calculateDefaultRotation, calculateSpinToRotation, getWheelNumbers } from '../../helpers';

const availableWinningBets = [
  ...config['1_TO_18'],
  ...config['19_TO_36'],
  ...['-1', '0'],
].map((bet) => `${bet}`);

//#endregion
export interface IRouletteWheelProps {
  start: boolean;
  winningBet: (typeof availableWinningBets)[number];
  onSpinningEnd?: () => void;
  withAnimation?: boolean;
  layoutType?: RouletteLayoutType;
}

export const RouletteWheel: FC<IRouletteWheelProps> = ({
  start,
  winningBet,
  onSpinningEnd,
  withAnimation,
  layoutType = 'european',
}) => {
  const [wheelNumbers, setWheelNumbers] = useState<string[]>([]);

  const innerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setWheelNumbers(getWheelNumbers(layoutType));
  }, [layoutType]);

  useEffect(() => {
    const currentInnerRef = innerRef.current;

    if (winningBet === '-1' || currentInnerRef === null || start === false) {
      return;
    }

    currentInnerRef.removeAttribute('data-spintoindex');

    const betIndex = wheelNumbers.indexOf(winningBet);

    setTimeout(() => {
      currentInnerRef.setAttribute('data-spintoindex', `${betIndex}`);

      let spins = 3;
      currentInnerRef.style.setProperty('--wheel-rotation-duration', spins + `s`);
      currentInnerRef.style.setProperty('--wheel-rotation', calculateSpinToRotation(layoutType, betIndex, spins) + `deg`);

      setTimeout(() => {
        onSpinningEnd?.();
      }, spins * 1000);
    }, 100);
    // we're ignoring only the onSpinningEnd onSpinningEnd dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winningBet, start]);

  return (
    <div className="roulette-wheel-container">
      <div
        className={classNames('roulette-wheel-plate', {
          'with-animation': withAnimation,
        })}
      >
        <ul className={`roulette-wheel-inner ${layoutType}`} ref={innerRef}>
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

RouletteWheel.defaultProps = {
  onSpinningEnd: () => undefined,
  withAnimation: true,
  layoutType: 'european',
};
