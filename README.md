# React Casino Roulette


It is **not the first but it is the best** open source React casino roulette. No canvas used, only pure HTML, CSS, and JS for the best performance. Ready to be used.

> This is a continuation(fork) of Ivan Admaer's amazing work. https://github.com/IvanAdmaers/react-casino-roulette 

[![React Advanced Casino Roulette](https://i.imgur.com/moIGHcG.png)](https://react-casino-roulette.ivanadmaers.com)
## Features

 - ✅ Ready to use
 - 💅 Customizable
 - 💪 Responsive, Mobile-friendly
 - 🎲 Supports both `European` and `American`
 - 🎁 Includes `RouletteWheel`, `RouletteTable`, `ChipsList` components and `useRoulette` hook.
 - ⚙ Typescript support
 - 🚀 No canvas, pure HTML, CSS, JS.
 - 💡 Open for more. Request a feature in the issues tab.
 - 📝 MIT license 

## Table of Contents
- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Types](#types)
  - [Chips](#chips)
  - [BetId](#betid)
  - [BetType](#bettype)
- [Props](#props)
    - 🎡 [RouletteWheel Props](#roulettewheel-props)
    - 🎲 [RouletteTable Props](#roulettetable-props)
    - ⚙ [useRoulette hook](#useroulette-hook)
    - 💰 [ChipList](#chiplist)
- [FAQ](#faq)
- [Credits](#credits)

## Install

```bash
# Via npm:
npm install git+https://github.com/dozsolti/react-casino-roulette.git
# Via yarn:
yarn add git+https://github.com/dozsolti/react-casino-roulette.git
```
**Don't forget to import this in your components**
```jsx
import 'react-casino-roulette/dist/index.css';
```

## Usage
See the `example/src/examples` folder for more examples.


**Table**

```jsx
import React from 'react';
import { RouletteTable, useRoulette } from 'react-casino-roulette';

// Note: Don't forget to your own chip images.
const chips = {
  '1': 'https://github.com/dozsolti/react-casino-roulette/blob/main/example/public/images/blank-chips/white-chip.png?raw=true',
  '10': 'https://github.com/dozsolti/react-casino-roulette/blob/main/example/public/images/blank-chips/blue-chip.png?raw=true',
}

function ExampleBasicTable() {
  const { bets, onBet } = useRoulette();

  return (
    <RouletteTable chips={chips} bets={bets} onBet={onBet(5)} />
  )
}

export default ExampleBasicTable
```

**Wheel**

```jsx
import React, { useState } from 'react';
import { RouletteWheel } from 'react-casino-roulette';

function ExampleBasicWheel() {

  const [winningBet, setWinningBet] = useState('-1');
  const [wheelStart, setWheelStart] = useState(false);


  const doSpin = () => {
    setWinningBet('00'); // One of these: '00', '0', '1', '2', ... '36'
    setWheelStart(true);
  }

  const handleEndSpin = (winner) => {
    alert("The ball landed on " + winner); // in this example it will be '00'
    setWheelStart(false);
  };

  return (
      <>
        <RouletteWheel
            start={wheelStart}
            winningBet={winningBet}
            onSpinningEnd={handleEndSpin}
        />
        <button onClick={doSpin} disabled={wheelStart}>Spin</button>
      </>
  )
}

export default ExampleBasicWheel
```

**ChipList**

```jsx
import React, { useState } from 'react';
import { ChipList } from 'react-casino-roulette';

import whiteChip from '../../../public/images/blank-chips/white-chip.png';
import blueChip from '../../../public/images/blank-chips/blue-chip.png';
import blackChip from '../../../public/images/blank-chips/black-chip.png';
import cyanChip from '../../../public/images/blank-chips/cyan-chip.png';

const chips = {
  '1': whiteChip,
  '10': blueChip,
  '100': blackChip,
  '500': cyanChip,
}

function ExampleChips() {
  const [selectedChip, setSelectedChip] = useState(Object.keys(chips)[0]);

  return (
    <ChipList
      chips={chips}
      selectedChip={selectedChip}
      onChipPressed={setSelectedChip} />
  )
}

export default ExampleChips;
```

## Types

### Chips
List of the all available chips. You need to specify the *amount* and the *image*, and the components will take care of the rest.

```ts
export type Chips = { [amount: string]: ImgHTMLAttributes<any>['src'] };

// Example
const chips = {
  '1': '<image url>',
  '10': '<image url>',
}
```
[See supported images.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src)


### BetId
Contains all possible bets.
```ts
export type BetId = number | '00' | '0' | '1' | '2' | ... | '34' | '35' | '36' | '00-0' | '00-3' | '00-2-3' | ... | '31-32-33-34-35-36' | '34-35-36' | '1ST_DOZEN' | '2ND_DOZEN' | .. | 'RED' | 'EVEN' | '1_TO_18';
```
Note: also uses the `number` type to support betting on a single number (as a `number` not as a `string`).

[See full list here](./src/types.ts).

### BetType
| **Prop Name** | **Type** | **Example** | **Description** |
|---|---|---|---|
| `amount` | `number` | `25` | How much do you bet. *No currency is used.*
| `payload` | `string[]` | `["0","1","2"]` | An array of strings representing all the numbers you bet.
| `payoutScale` | `number` | `12` | How much you will win. For a `single number`  the scale is `36`. For `RED` the scale is `2`.<br/>To get the amount won calculate `bet.amount * bet.payoutScale`.


### Bets
It is a key-value pair for the id and data.
```ts
export type Bets = Record<BetId, BetType>;
```

### Roulette layout type
```ts
export type RouletteLayoutType = 'european' | 'american';
```

## Props

### RouletteWheel Props

| **Prop Name** | **Type** | **Default** | **Description** | **Required** |
|---|---|---|---|---|
| start | `boolean` | - | Sets when the wheel should start spinning. | Required |
| winningBet | `string` | - | Sets the wheel winning bet.<br />**Available values**: `'-1'`, `'0'`, `'00'` and `'1'` to `'36'`. | Required |
| onSpinningEnd | `(winner: AvailableNumbers) => void` | `() => undefined` | Triggers when the wheel stops spinning.<br/>Returns the spin's results. |  |
| layoutType | `RouletteLayoutType` | `'european'` | The European-style layout has a **single zero**, and the American style layout is usually a **double-zero**. |   |
| automaticSpinning | `boolean` | `true` | Used only as an *idle animation*, works separatly from ball spinning. By default is set to `true` so it spins the wheel continuously. If set to `false`, the Wheel will only spin when triggered by a user interaction or other event. |  |
| spinLaps | `number` | `3` | The number of complete rotations the wheel should make before stopping. |  |
| spinDuration | `number` | `3` | The duration of the spin animation in seconds. |  |
| spinEaseFunction | `transition-timing-function` | `'ease-out'` | The easing function to be used for the spin animation. This property controls the acceleration and deceleration of the spin. Common easing functions include `'linear'`, `'ease-in'`, `'ease-out'`, and [others](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). |  |

---

### RouletteTable Props

| **Prop Name** | **Type** | **Default** | **Description** | **Required** |
|---|---|---|---|---|
| bets | `Bets` | - | See `Bets` type for [details](#bets). | Required |
| onBet | `(params: IOnBetParams) => void` | - | A callback function that is triggered when a bet is placed. The params object contains the following properties:<br/><br>* `bet`: The type of the bet, as defined in the ACTION_TYPES enum.<br>* `payload`: An array of strings representing the payload of the bet.<br>* `id`: A unique identifier for the bet. | Required |
| chips | `Chips` | - | List of the all available chips. See `Chips` type for [details](#chips). | Required |
| layoutType | `RouletteLayoutType` | `'european'` | The European-style layout has a **single zero**, and the American style layout is usually a **double-zero**. |   |
| readOnly | `boolean` | `false` | When set to `true`, the component becomes disabled, preventing user interaction.<br><br>**Recommended** to enable readOnly while the wheel is spinning to disable later bets. |  |
| height | `boolean` | `368px` | The height of the component. A specific value (e.g., `'368px'`). |  |
| isDebug | `boolean` | `false` | Enables debug mode, which can be used to see all the bet-able positions on the table. |  |

---

### useRoulette hook

| **Prop Name** | **Type** | **Default** | **Description** |
|---|---|---|---|
| bets | `Bets` | `{}` | See `Bets` type for [details](#bets). |
| onBet | `(amount: number \| string, mode: BetModes) => (payload: string[], id: BetId) => void` | - | A callback function that is triggered when a bet is placed. It takes two arguments: `amount` and `mode`.<br/><br>* **amount:** The amount to be added, subtracted, or set for the bet.<br>* **mode:** The operation to be performed on the bet, can be one of: 'add', 'set', or 'remove'.<br/><br>The callback function returns another function that needs to be sent to the `RouletteTable`. |
| hasBets | `boolean` | `false` | Returns whether there are any bets placed. |
| total | `number` | `0` | The sum of all bets. |
| updateBet | `(betId: BetId, amount: number) => void` | - | Sets the amount of **one bet**. If amount is `0 or below` the bet will be removed. |
| updateAllBets | `(newBets: { [betId in BetId]: number }) => void` | - | A function will overrides **all the bets**.<br>**Only** need to specify the `betId` and `amount`, the rest of data will be calculated, such as `payload` and `payoutScale`. |
| removeBet | `(betId: BetId) => void` | - | Removes a specific bet from the list. |
| clearBets | `() => void` | - | Removes all bets. |

---

### ChipList

| **Prop Name** | **Type** | **Default** | **Description** | **Required** |
|---|---|---|---|---|
| chips | `Chips` | - | List of the all available chips. See `Chips` type for [details](#chips).  | Required |
| selectedChip | `string` | - | The currently selected chip value. | Required |
| onChipPressed | `(chipValue: string) => any` | - | A callback function that is triggered when a chip is pressed. The function receives the value of the selected chip as an argument. | Required |
| budget | `number` | `-1` | The total budget available for betting. If specified every chip that is `strictly greater` than the budget will be disabled.  |  |
| chipSize | `number` | `64` | The size of the chips in pixels. |  |



## FAQ

❓ **Where can I find an example of using this package?**  
💬 Use the links below:
* [Examples folder](./example/src/examples/)

❓ **How can I customize the table or wheel?**  
💬 You can customize using props for by overriding default css styles.

❓ **Can I use this with SSR?**  
💬 Of course. And if you are using NextJS we would like to recommend you to import this package [dynamically](https://nextjs.org/docs/advanced-features/dynamic-import) to decrease your project final bundle size.

❓ **What React versions does this package support?**  
💬 This project requires:
* react >=17.0.0
* react-dom >=17.0.0

❓ **Are ideas welcome?**  
💬 We value all ideas, improvements, suggestions and pull requests ❤️.


## Credits

🙏 Special thanks for Ivan Admaer for making this project possible. https://github.com/IvanAdmaers/
