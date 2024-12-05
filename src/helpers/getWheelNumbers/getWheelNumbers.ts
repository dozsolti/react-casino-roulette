import { RouletteLayoutType } from '../../types';

/**
 * Returns the numbers for the roulette wheel in the official order.
 * @param layoutType european or american
 * @see https://en.wikipedia.org/wiki/Roulette#:~:text=the%20winning%20number.-,Roulette%20wheel%20number%20sequence,-%5Bedit%5D
 */
export const getWheelNumbers = (layoutType: RouletteLayoutType) => {
  if (layoutType == 'european')
    return ['0', '32', '15', '19', '4', '21', '2', '25', '17', '34', '6', '27', '13', '36', '11', '30', '8', '23', '10', '5', '24', '16', '33', '1', '20', '14', '31', '9', '22', '18', '29', '7', '28', '12', '35', '3', '26'];
  else
    return ['0', '28', '9', '26', '30', '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36', '13', '1', '00', '27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21', '33', '16', '4', '23', '35', '14', '2'];
};
