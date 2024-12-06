import config from '../config/table.json';
import { BetId } from '../types';

// const ALL_NUMBERS = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];

const DOUBLES = ['ODD', 'EVEN', '1_TO_18', '19_TO_36', 'RED', 'BLACK'];

const TRIPLES = ['1ST_COLUMN', '2ND_COLUMN', '3RD_COLUMN', '1ST_DOZEN', '2ND_DOZEN', '3RD_DOZEN'];
/**
 * @example For a single number will get 36 times back. Betting 10$ will reward you with 360$. But since you payed 10$ for the bet, the total profit will be only 350$.
 * @see https://www.onlinegambling.com/casino/roulette/bets-payouts/#:~:text=online%20casino%20game.-,Roulette%20Payout%20Odds,-Bet%20Type
 */
export function calculatePayout(betId: BetId) {
    if (typeof betId === 'number') return 36;
    if (DOUBLES.includes(betId)) return 2;
    if (TRIPLES.includes(betId)) return 3;

    /* 
        Examples: "8-9", 10-11-12-13-14-15
        Note: In case of "00-0-1-2-3", the length will be 5, 36/5 => 7.2 => 7
    */
    const v = betId.split('-');
    return Math.floor(36 / v.length);
}


export function getPayloadFromBetId(betId: string) {
    if (betId in config)
        return config[betId as keyof typeof config].map(x => x + '');
    return betId.split('-')
}