export const getRandomRouletteWinBet = (layoutType = 'european') => {

  const possibleWinBets = ['0', ...Array.from({ length: 36 }, (_, i) => `${i + 1}`)];

  if (layoutType === 'american')
    possibleWinBets.push('00');

  const randomIndex =
    window.crypto.getRandomValues(new Uint32Array(1))[0] %
    possibleWinBets.length;

  return possibleWinBets[randomIndex];
};
