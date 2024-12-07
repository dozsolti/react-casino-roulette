import type { ImgHTMLAttributes } from 'react';
import { ACTION_TYPES } from './constants';

export type BetId = number | '00' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '00-0' | '00-3' | '00-2-3' | '0-00-2' | '0-1-2' | '0-1' | '00-0-1-2-3' | '3-6' | '2-3-5-6' | '2-5' | '1-2-4-5' | '1-4' | '1-2-3-4-5-6' | '6-9' | '5-6-8-9' | '5-8' | '4-5-7-8' | '4-7' | '4-5-6-7-8-9' | '5-6' | '4-5' | '1-2' | '2-3' | '1-2-3' | '4-5-6' | '7-8-9' | '7-8-9-10-11-12' | '7-10' | '7-8-10-11' | '7-8' | '8-11' | '8-9' | '8-9-11-12' | '9-12' | '12-15' | '15-18' | '18-21' | '21-24' | '24-27' | '27-30' | '30-33' | '33-36' | '11-12' | '11-12-14-15' | '14-15' | '14-15-17-18' | '17-18' | '17-18-20-21' | '20-21' | '20-21-23-24' | '23-24' | '23-24-26-27' | '26-27' | '26-27-29-30' | '29-30' | '29-30-32-33' | '32-33' | '32-33-35-36' | '35-36' | '11-14' | '10-11' | '10-11-13-14' | '13-14' | '14-17' | '13-14-16-17' | '17-20' | '20-23' | '16-17-19-20' | '19-20-22-23' | '16-17' | '19-20' | '23-26' | '22-23' | '22-23-25-26' | '26-29' | '25-26' | '25-26-28-29' | '29-32' | '28-29-31-32' | '28-29' | '31-32' | '32-35' | '31-32-34-35' | '34-35' | '10-11-12' | '10-13' | '10-11-12-13-14-15' | '13-14-15-16-17-18' | '13-14-15' | '13-16' | '16-19' | '19-22' | '22-25' | '25-28' | '28-31' | '31-34' | '16-17-18' | '16-17-18-19-20-21' | '19-20-21' | '19-20-21-22-23-24' | '22-23-24' | '22-23-24-25-26-27' | '25-26-27' | '25-26-27-28-29-30' | '28-29-30' | '28-29-30-31-32-33' | '31-32-33' | '31-32-33-34-35-36' | '34-35-36' | '1ST_DOZEN' | '2ND_DOZEN' | '3RD_DOZEN' | '1ST_COLUMN' | '2ND_COLUMN' | '3RD_COLUMN' | '19_TO_36' | 'ODD' | 'BLACK' | 'RED' | 'EVEN' | '1_TO_18';

export type Bets = Record<BetId, BetType>;

export type BetType = {
    amount: number;
    payload: string[],
    payoutScale: number,
};

export type RouletteLayoutType = 'european' | 'american';

/**
 * @example { '1': '<image url>', '10': '<image url>', ... }
 */
export type Chips = { [amount: string]: ImgHTMLAttributes<any>['src'] };

// Hooks
export type BetModes = 'add' | 'remove' | 'set';

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
    id: BetId;
}
export interface IRouletteTableProps {
    chips: Chips;
    bets: Bets;
    onBet: (params: IOnBetParams) => void;
    layoutType?: RouletteLayoutType;

    height?: React.CSSProperties['height'];
    readOnly?: boolean;

    isDebug?: boolean;
}

export interface IRouletteWheelProps {
    start: boolean;
    winningBet: AvailableNumbers | '-1';
    onSpinningEnd?: (winner: AvailableNumbers) => void;
    layoutType?: RouletteLayoutType;
    automaticSpinning?: boolean,
    spinLaps?: number,
    spinDuration?: number,
    spinEaseFunction?: React.CSSProperties['transitionTimingFunction']
}

export interface IUseRouletteResult {
    bets: Bets;
    hasBets: boolean;
    total: number;
    onBet: (amount: number | string, mode?: BetModes) => IRouletteTableProps['onBet'];
    updateBet: (betId: BetId, amount: number) => void;
    updateAllBets: (newBets: { [betId in BetId]: number }) => void;
    removeBet: (betId: BetId) => void;
    clearBets: () => void;
}