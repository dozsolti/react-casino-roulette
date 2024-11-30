import React, { useContext, useMemo } from 'react';
import type { FC } from 'react';

import { Chip } from '../Chip';

import { ACTION_TYPES } from '../../../constants';
import { findChipIcon, shouldRenderChip } from '../../../helpers';
import { IRouletteTableContextProps, RouletteTableContext } from '../../../context';
import { TableLayoutType } from '../types';
import { ChipRenderer } from '../utils/ChipRenderer';

interface IZeroBetsProps {
  layoutType: TableLayoutType;
}

export const ZeroBets: FC<IZeroBetsProps> = ({ layoutType }) => {
  const { bets } = useContext(RouletteTableContext);

  return (
    <>
      <RenderSingleZero layoutType={layoutType} bets={bets} />
      {layoutType == 'american' && <RenderDoubleZero layoutType={layoutType} bets={bets} />}
    </>
  );
};


function RenderDoubleZero({ layoutType, bets }: { layoutType: TableLayoutType, bets: IRouletteTableContextProps['bets'] }) {
  return (<div
    key={`zero-item-00`}
    className={`zero-item ${layoutType === 'european' ? 'single-zero' : ''}`}
    data-action={ACTION_TYPES['00']}
    data-bet={'00'}
  >

    {/* Chips - 00-3 */}
    {<ChipRenderer
      cName="split-up-bet-catcher-right"
      action={ACTION_TYPES.SPLIT}
      highlight={`00-3`}
      style={{
        zIndex: 12,
        height: '85px',
      }}
      chipPosition={'right-top-with-offset'}
    />}

    {/* end chip */}

    {/* Chips - 00-2*/}
    {<ChipRenderer
      cName='split-up-bet-catcher-right'
      action={ACTION_TYPES.SPLIT}
      highlight={`00-2`}
      style={{ height: 85, top: 'auto', bottom: 0 }}
      chipPosition={'right-bottom-with-no-offset'}
    />}
    {/* end chip */}


    <div className="value">00</div>
    {shouldRenderChip('00', bets) && (
      <Chip position="center" icon={findChipIcon('00', bets)} />
    )}
  </div>)
}

function RenderSingleZero({ layoutType, bets }: { layoutType: TableLayoutType, bets: IRouletteTableContextProps['bets'] }) {
  return (<div
    key={`zero-item-0`}
    className={`zero-item ${layoutType === 'european' ? 'single-zero' : ''}`}
    data-action={ACTION_TYPES['0']}
    data-bet={'0'}
  >
    {/* Chips - 0-00-2 */}
    {layoutType === 'american' &&
      <ChipRenderer
        cName='spleet-bet-catcher'
        action={ACTION_TYPES.STREET}
        highlight='0-00-2'
        style={{ left: 'auto', right: -15, zIndex: 13 }}
        chipPosition="right-top"
      />}
    {/* end chip */}

    {/* Chips - Line between zeros - 00-0 */}
    {layoutType === 'american' &&
      <ChipRenderer
        cName="split-up-bet-catcher-top"
        action={ACTION_TYPES.ROW}
        highlight="00-0"
        chipPosition="center-top"
      />
    }
    {/* end chip */}

    {/* Chips - 0-2*/}
    {<ChipRenderer
      cName="split-up-bet-catcher-right"
      action={ACTION_TYPES.SPLIT}
      highlight={`0-2`}
      chipPosition={layoutType === 'american' ? 'right-top-with-no-offset' : 'right-center'}
    />}
    {/* end chip */}


    {/* Chips - 0-3*/}
    {layoutType === 'european' && <ChipRenderer
      cName="split-up-bet-catcher-right"
      action={ACTION_TYPES.SPLIT}
      highlight={`0-3`}
      style={{ height: 85, top: 0, bottom: 'auto' }}
      chipPosition={'right-top-with-offset'}
    />}
    {/* end chip */}

    {/* Chips - 0-1*/}
    {<ChipRenderer
      cName='split-up-bet-catcher-right'
      action={ACTION_TYPES.SPLIT}
      highlight={`0-1`}
      style={{ height: 85, top: 'auto', bottom: 0 }}
      chipPosition={'right-bottom-with-offset'}
    />}
    {/* end chip */}

    {/* Chips - Line below 0 - 00-0-1-2-3 - street */}
    {
      <ChipRenderer
        cName={`basket-catcher-bottom`}
        action={ACTION_TYPES.BASKET_US}
        highlight={layoutType === 'american' ? '00-0-1-2-3' : '0-1-2-3'}
        style={{ left: -3 }}
        hideChips={true}
      />}
    {/* end chip */}
    {/* Chips - bottom right corner below 0 - street */}
    {<ChipRenderer
      cName={`corner-bet-catcher bottom`}
      action={ACTION_TYPES.BASKET_US}
      highlight={layoutType === 'american' ? '00-0-1-2-3' : '0-1-2-3'}
      style={{ zIndex: 14 }}
      chipPosition={'right-bottom'}
    />}
    {/* end chip */}

    <div className="value">0</div>
    {shouldRenderChip('0', bets) && (
      <Chip position="center" icon={findChipIcon('0', bets)} />
    )}
  </div>)
}