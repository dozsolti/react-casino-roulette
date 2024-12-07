import { RouletteTable } from './components/RouletteTable';
import { RouletteWheel } from './components/RouletteWheel';
import { ChipList } from './components/ChipList';
import { useRoulette } from './hooks/useRoulette';

export { RouletteTable, RouletteWheel, ChipList, useRoulette };
export * from './types';

import { findChipIcon } from './helpers/findChipIcon';
import { getWheelNumbers } from './helpers/getWheelNumbers';
import { getNumberCount } from './helpers/wheelRotation';
import {
    calculatePayout,
    getPayloadFromBetId,
} from './helpers/payoutCalculator';

export const utils = {
    findChipIcon,
    getWheelNumbers,
    getNumberCount,
    calculatePayout,
    getPayloadFromBetId,
}