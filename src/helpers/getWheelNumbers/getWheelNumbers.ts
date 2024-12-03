import { RouletteLayoutType } from '../../types';

export const getWheelNumbers = (layoutType: RouletteLayoutType) => {

  // 1st step - Create array
  // Array.from({length:36}, (_,i)=>(i+1).toString())
  const staticWheelNumbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36'];

  // 2nd step - Shuffle
  staticWheelNumbers.sort((a, b) => Math.random() - 0.5);

  // 3rd step - Adding zeros
  staticWheelNumbers.push('0')

  if (layoutType === 'american') {
    staticWheelNumbers.splice(18, 0, '00')
  }

  return staticWheelNumbers;
};
