import React from "react";
import { ACTION_TYPES } from "../../../../constants";
import { IRouletteTableContextProps } from "../../../../context";
import { findChipIcon, shouldRenderChip } from "../../../../helpers";
import { Chip } from "../../Chip";
import { Chips, RouletteLayoutType } from "../../../../types";
import { ChipRenderer } from "../../utils/ChipRenderer";

export function SingleZero({ layoutType, bets, chips }: { layoutType: RouletteLayoutType, bets: IRouletteTableContextProps['bets'], chips: Chips }) {
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
            <Chip position="center" bet={bets['0']} icon={findChipIcon(bets['0'], chips)} />
        )}
    </div>)
}