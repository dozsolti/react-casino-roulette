import React, { useContext } from 'react';
import type { FC } from 'react';

import { Chip } from '../Chip';
import { RouletteTableContext } from '../../../context';

import config from '../../../config/table.json';
import {
  findChipIcon,
  shouldRenderBottomCatcher,
  shouldRenderChip,
  shouldRenderCornerBetCatcher,
  shouldRenderRightCatcher,
  shouldRenderSixLineBetCatcher,
  shouldRenderTopCatcher,
} from '../../../helpers';
import { ACTION_TYPES } from '../../../constants';
import { ChipRenderer } from '../utils/ChipRenderer';
import { BetId, RouletteLayoutType } from '../../../types';

const NUMBERS = Array.from({ length: 36 }, (_, i) => i + 1);

interface INumberBetsProps {
  layoutType: RouletteLayoutType;
}

export const NumberBets: FC<INumberBetsProps> = ({ layoutType }) => {
  const { bets, chips } = useContext(RouletteTableContext);

  return (
    <>
      {NUMBERS.map((number) => (
        <div
          key={number}
          data-action={ACTION_TYPES.STRAIGHT_UP}
          data-bet={`${number}`}
          className={`${config.RED.includes(number) ? 'red-item' : 'black-item'}`}
        >
          {/* Chips - 4 numbers "2-3-5-6","5-6-8-9" - corner  */}
          {shouldRenderCornerBetCatcher(number) &&
            <ChipRenderer
              cName="corner-bet-catcher"
              action={ACTION_TYPES.CORNER}
              highlight={`${number}-${number + 1}-${number + 3}-${number + 4}`}
              chipPosition={'right-top'}
            />
          }
          {/* end chip */}

          {/* Chips - 0-1-2 - street */}
          {(number === 1) && (
            <ChipRenderer
              cName="spleet-bet-catcher"
              action={ACTION_TYPES.STREET}
              highlight={'0-1-2'}
              chipPosition={'left-top'}
              style={{ zIndex: 12 }}
            />
          )}

          {/* Chips - `00-2-3` : '0-2-3' - street */}
          {(number === 2) && (
            <ChipRenderer
              cName="spleet-bet-catcher"
              action={ACTION_TYPES.STREET}
              highlight={layoutType === 'american' ? `00-2-3` : '0-2-3'}
              chipPosition={'left-top'}
              style={{ zIndex: 12 }}
            />
          )}

          {/* Chips between two numbers vertically - 8-9 - split */}
          {shouldRenderTopCatcher(number) && (
            <ChipRenderer
              cName="split-up-bet-catcher-top"
              action={ACTION_TYPES.SPLIT}
              highlight={`${number}-${number + 1}`}
              chipPosition={'center-top'}
            />
          )}

          <div className="value">{number}</div>

          {shouldRenderChip(`${number}`, bets) && (
            <Chip position="center" bet={bets[number]} icon={findChipIcon(bets[number], chips)} />
          )}

          {/* Chips between two numbers horizontally - 11-14 - split */}
          {shouldRenderRightCatcher(number) && (
            <ChipRenderer
              cName="split-up-bet-catcher-right"
              action={ACTION_TYPES.SPLIT}
              highlight={`${number}-${number + 3}`}
              chipPosition={'right-center'}
            />
          )}

          {/* Chips - one small column - 7-8-9 - street */}
          {shouldRenderBottomCatcher(number) && (
            <ChipRenderer
              cName="split-up-bet-catcher-bottom"
              action={ACTION_TYPES.STREET}
              highlight={`${number}-${number + 1}-${number + 2}`}
              chipPosition={'center-bottom'}
            />
          )}

          {/* Chips - two small columns - 16-17-18-19-20-21 - double street */}
          {shouldRenderSixLineBetCatcher(number) && (
            <ChipRenderer
              cName="six-lines-catcher"
              action={ACTION_TYPES.DOUBLE_STREET}
              highlight={`${number}-${number + 1}-${number + 2}-${number + 3}-${number + 4}-${number + 5}`}
              chipPosition={'right-bottom'}
            />
          )}
        </div>
      ))}
    </>
  );
};
