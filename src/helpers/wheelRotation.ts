import { RouletteLayoutType } from "../types";
import { getRandomRange } from "../utills";
import wheelRotationConfig from '../config/wheelRotationConfig.json';

export function getNumberCount(layoutType: RouletteLayoutType) {
    // 36 + 0 + optional 00
    return layoutType == 'american' ? 38 : 37;
}

export function calculateDefaultRotation(layoutType: RouletteLayoutType, index: number): number {
    const numberCount = getNumberCount(layoutType)

    return +((360 / numberCount) * (index)).toFixed(3)
}
/**
 * 
 * @param index the index number from the array on which should the ball land.
 * @param spins How manny laps should the ball do before stopping.
 * @returns the number in degrees.
 */
export function calculateSpinToRotation(layoutType: RouletteLayoutType, index: number, spins = 8): number {

    const DEFAULT_SPIN_POSITION = 51.3; // This is a value for top number.

    const config = wheelRotationConfig[layoutType];
    if (!config) {
        console.error(`Config file missing for layoutType=${layoutType}, index=${index}, spins=${spins}.\nUsing to the default rotation value: ${DEFAULT_SPIN_POSITION}deg.\n\nWARNING: Ball might land on the wrong number.`)
        return DEFAULT_SPIN_POSITION + spins * 360;
    }

    if (config.rotations[index] == undefined) {
        console.error(`Config file missing for layoutType=${layoutType}, index=${index}, spins=${spins}.\nUsing to the default rotation value: ${DEFAULT_SPIN_POSITION}deg.\n\nWARNING: Ball might land on the wrong number.`)
    }

    let rotation = config.rotations[index] || DEFAULT_SPIN_POSITION;

    // Adding a small random offset to look more realistic.
    rotation += getRandomRange(config.randomOffset.min, config.randomOffset.max);

    // Adding the laps
    rotation += spins * 360;

    return rotation;
}
