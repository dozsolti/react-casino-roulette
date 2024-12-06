import React, { ReactNode, useContext } from "react";
import { findChipIcon, shouldRenderChip } from "../../../helpers";
import { Chip } from "../Chip";
import { RouletteTableContext } from "../../../context";
import { BetId } from "../../../types";

interface ChipRendererProps {
    cName: string,
    action: string,
    highlight: any, // Refactor this later. In some places it uses STREET.
    style?: any,
    chipPosition?: any,
    hideChips?: boolean,
    betLabel?: string | ReactNode;
}

export function ChipRenderer({ cName, action, highlight, style = {}, chipPosition = '', hideChips = false, betLabel = '' }: ChipRendererProps) {
    const { onBetCatcherHover, bets, chips } = useContext(RouletteTableContext);

    const betIcon = findChipIcon(bets[highlight], chips)

    if (betLabel)
        return (
            <div
                className={cName}
                onMouseEnter={onBetCatcherHover}
                onMouseLeave={onBetCatcherHover}
                data-action={action}
                data-bet={action}
                data-highlight={highlight}
            >
                <div>{betLabel}</div>
                {shouldRenderChip(highlight, bets) && (
                    <Chip
                        position={chipPosition}
                        bet={bets[highlight]}
                        icon={betIcon}
                    />
                )}
            </div>
        )

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
                    icon={betIcon}
                />
            )}
        </>
    );
}