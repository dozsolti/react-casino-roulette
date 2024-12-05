import { ACTION_TYPES } from './constants';

export type BetType = {
    amount: number;
};

export type RouletteLayoutType = 'american' | 'european';

/**
 * @example { '1': '<image url>', '10': '<image url>', ... }
 */
export type Chips = { [amount: string]: any };


export interface IChipListProps {
    chips: Chips;
    selectedChip: string;
    onChipPressed: (chipValue: string) => any;

    budget?: number;
    chipSize?: number;
}

export type AvailableNumbers = '00' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36';

export interface IOnBetParams {
    bet: keyof typeof ACTION_TYPES;
    payload: string[];
    id: string;
}
export interface IRouletteTableProps {
    onBet: (params: IOnBetParams) => void;
    bets: { [key: string]: BetType };
    isDebug?: boolean;
    readOnly?: boolean;
    layoutType?: RouletteLayoutType;
    chips: Chips;
}

export interface IRouletteWheelProps {
    start: boolean;
    winningBet: AvailableNumbers | '-1';
    onSpinningEnd?: () => void;
    layoutType?: RouletteLayoutType;
    automaticSpinning?: boolean,
    spinLaps?: number,
    spinDuration?: number,
    spinEaseFunction?: React.CSSProperties['transitionTimingFunction']
}