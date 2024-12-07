import { useMemo, useState } from "react";
import { BetId, Bets, IUseRouletteResult } from "../types";
import { calculatePayout, getPayloadFromBetId } from "../helpers/payoutCalculator";

export function useRoulette(): IUseRouletteResult {
    const [bets, setBets] = useState<IUseRouletteResult['bets']>({} as Bets);

    const hasBets = useMemo<IUseRouletteResult['hasBets']>(() => {
        return Object.keys(bets || {}).length > 0;
    }, [bets])

    const total = useMemo<IUseRouletteResult['total']>(() => {

        let sum = 0;
        for (let k in bets)
            sum += (bets[k as keyof typeof bets] as any).amount;

        return sum;

    }, [bets]);

    const onBet: IUseRouletteResult['onBet'] = (amount, mode = 'add') => {
        return ({ payload, id }) => {

            const value = Number(amount);

            setBets((prevState) => {
                const state: Bets = JSON.parse(JSON.stringify(prevState));


                if (!(id in state)) {
                    if (mode === 'add' || mode === 'set') {
                        state[id] = {
                            amount: value,
                            payload,
                            payoutScale: calculatePayout(id)
                        };
                    }
                    return state;
                }

                if (mode === 'set') {
                    state[id].amount = value;
                } else if (mode === 'add') {
                    state[id].amount += value;
                } else if (mode === 'remove') {
                    state[id].amount -= value;
                    if (state[id].amount <= 0)
                        delete state[id];
                }

                return state;
            });
        }
    };

    const clearBets: IUseRouletteResult['clearBets'] = () => {
        setBets({} as Bets)
    }

    const removeBet: IUseRouletteResult['removeBet'] = (betId: BetId) => {
        setBets((prevState) => {
            const state = JSON.parse(JSON.stringify(prevState));

            delete state[betId];

            return state;
        });
    }

    const updateBet: IUseRouletteResult['updateBet'] = (betId, amount) => {
        setBets(prevState => {
            const state: Bets = JSON.parse(JSON.stringify(prevState));
            if (betId in state) {
                if (amount <= 0)
                    delete state[betId];
                else
                    state[betId].amount = amount;
            } else {
                state[betId] = {
                    amount: amount,
                    payload: getPayloadFromBetId(betId as string),
                    payoutScale: calculatePayout(betId)
                };
            }

            return state;
        });
    }

    const updateAllBets: IUseRouletteResult['updateAllBets'] = (newBets) => {
        const obj = {} as Bets;

        for (let betId in newBets)
            if (newBets[betId] > 0)
                obj[betId] = {
                    amount: newBets[betId],
                    payload: getPayloadFromBetId(betId),
                    payoutScale: calculatePayout(betId as BetId)
                }


        setBets(obj);
    }

    return { bets, hasBets, total, onBet, updateBet, updateAllBets, clearBets, removeBet };

}