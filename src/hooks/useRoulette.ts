import { useMemo, useState } from "react";
import { BetId, BetModes, Bets, IRouletteTableProps } from "../types";
import { calculatePayout, getPayloadFromBetId } from "../helpers/payoutCalculator";

export function useRoulette() {
    const [bets, setBets] = useState<Bets>({} as Bets);

    const total = useMemo<number>(() => {

        let sum = 0;
        for (let k in bets)
            sum += (bets[k as keyof typeof bets] as any).amount;

        return sum;

    }, [bets]);

    const onBet = (amount: number | string, mode: BetModes = 'add'): IRouletteTableProps['onBet'] => {
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

    const clearBets = () => {
        setBets({} as Bets)
    }

    const removeBet = (betId: BetId) => {
        setBets((prevState) => {
            const state = JSON.parse(JSON.stringify(prevState));

            delete state[betId];

            return state;
        });
    }

    const updateBets = (newBets: { [betId in BetId]: number }) => {
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

    return { bets, total, onBet, updateBets, clearBets, removeBet };

}