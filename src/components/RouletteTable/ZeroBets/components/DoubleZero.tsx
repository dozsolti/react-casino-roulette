import React from "react";
import { ACTION_TYPES } from "../../../../constants";
import { IRouletteTableContextProps } from "../../../../context";
import { findChipIcon, shouldRenderChip } from "../../../../helpers";
import { Chip } from "../../Chip";
import { Chips, RouletteLayoutType } from "../../../../types";
import { ChipRenderer } from "../../utils/ChipRenderer";

export function DoubleZero({ layoutType, bets, chips }: { layoutType: RouletteLayoutType, bets: IRouletteTableContextProps['bets'], chips: Chips }) {
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
            <Chip position="center" bet={bets['00']} icon={findChipIcon(bets['00'], chips)} />
        )}
    </div>)
}
