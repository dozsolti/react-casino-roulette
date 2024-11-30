import React, { useContext } from 'react';
import type { FC } from 'react';

import { Chip } from '../Chip';
import { RouletteTableContext } from '../../../context';

import config from '../../../config/table.json';
import {
  shouldRenderBottomCatcher,
  shouldRenderChip,
  shouldRenderCornerBetCatcher,
  shouldRenderRightCatcher,
  shouldRenderSixLineBetCatcher,
  shouldRenderTopCatcher,
  shouldRenderTopRightDoubleStreetCatcher,
  shouldRenderTopStreetCatcher,
  findChipIcon,
} from '../../../helpers';
import { ACTION_TYPES } from '../../../constants';
import { ChipRenderer } from '../utils/ChipRenderer';
import { TableLayoutType } from '../types';

const NUMBERS = Array.from({ length: 36 }, (_, i) => i + 1);

interface INumberBetsProps {
  layoutType: TableLayoutType;
}

export const NumberBets: FC<INumberBetsProps> = ({ layoutType }) => {
  const { onBetCatcherHover, bets } = useContext(RouletteTableContext);

  return (
    <>
      {NUMBERS.map((number) => (
        <div
          key={number}
          data-action={ACTION_TYPES.STRAIGHT_UP}
          data-bet={`${number}`}
          className={`${config.RED.includes(number) ? 'red-item' : 'black-item'
            }`}
        >
          {/* Chips - 4 numbers "2-3-5-6","5-6-8-9" - corner  */}
          {shouldRenderCornerBetCatcher(number) && <ChipRenderer
            cName="corner-bet-catcher"
            action={ACTION_TYPES.CORNER}
            highlight={`${number}-${number + 1}-${number + 3}-${number + 4}`}
            chipPosition={'right-top'}
          />
          }
          {/* end chip */}

          {(number === 1) && (
            <ChipRenderer
              cName="spleet-bet-catcher"
              action={ACTION_TYPES.STREET}
              highlight={'0-1-2'}
              chipPosition={'left-top'}
              style={{ zIndex: 12 }}
            />
          )}

          {(number === 2) && (
            <ChipRenderer
              cName="spleet-bet-catcher"
              action={ACTION_TYPES.STREET}
              highlight={layoutType === 'american' ? `00-2-3` : '0-2-3'}
              chipPosition={'left-top'}
              style={{ zIndex: 12 }}
            />
          )}

          {shouldRenderTopCatcher(number) && (
            <>
              <div
                className="split-up-bet-catcher-top"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.SPLIT}
                data-highlight={`${number}-${number + 1}`}
              />
              {shouldRenderChip(`${number}-${number + 1}`, bets) === true && (
                <Chip
                  position="center-top"
                  icon={findChipIcon(`${number}-${number + 1}`, bets)}
                />
              )}
            </>
          )}
          <div className="value">{number}</div>
          {shouldRenderChip(`${number}`, bets) && (
            <Chip position="center" icon={findChipIcon(`${number}`, bets)} />
          )}
          {shouldRenderRightCatcher(number) && (
            <>
              <div
                className="split-up-bet-catcher-right"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.SPLIT}
                data-highlight={`${number}-${number + 3}`}
              />
              {shouldRenderChip(`${number}-${number + 3}`, bets) === true && (
                <Chip
                  position="right-center"
                  icon={findChipIcon(`${number}-${number + 3}`, bets)}
                />
              )}
            </>
          )}
          {shouldRenderBottomCatcher(number) && (
            <>
              <div
                className="split-up-bet-catcher-bottom"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.STREET}
                data-highlight={`${number}-${number + 1}-${number + 2}`}
              />
              {shouldRenderChip(
                `${number}-${number + 1}-${number + 2}`,
                bets,
              ) === true && (
                  <Chip
                    position="center-bottom"
                    icon={findChipIcon(
                      `${number}-${number + 1}-${number + 2}`,
                      bets,
                    )}
                  />
                )}
            </>
          )}
          {shouldRenderSixLineBetCatcher(number) && (
            <>
              <div
                className="six-lines-catcher"
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={ACTION_TYPES.DOUBLE_STREET}
                data-highlight={`${number}-${number + 1}-${number + 2}-${number + 3
                  }-${number + 4}-${number + 5}`}
              />
              {shouldRenderChip(
                `${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4
                }-${number + 5}`,
                bets,
              ) === true && (
                  <Chip
                    position="right-bottom"
                    icon={findChipIcon(
                      `${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4
                      }-${number + 5}`,
                      bets,
                    )}
                  />
                )}
            </>
          )}
        </div>
      ))}
    </>
  );
};
