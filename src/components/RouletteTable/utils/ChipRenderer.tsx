import React, { useContext } from "react";
import { shouldRenderChip } from "../../../helpers";
import { Chip } from "../Chip";
import { RouletteTableContext } from "../../../context";

interface ChipRendererProps {
    cName: string,
    action: string,
    highlight: string,
    style?: any,
    chipPosition?: any,
    hideChips?: boolean,
}

export function ChipRenderer({ cName, action, highlight, style = {}, chipPosition = '', hideChips = false }: ChipRendererProps) {
    const { onBetCatcherHover, bets } = useContext(RouletteTableContext);

    return (
        <>
            <div
                className={cName}
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={action}
                data-highlight={highlight}
                style={style}
            />
            {!hideChips && shouldRenderChip(highlight, bets) === true && (
                <Chip
                    position={chipPosition}
                    bet={bets[highlight]}
                />
            )}
        </>
    );
}