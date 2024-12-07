import React from 'react';

import './ChipList.css';
import ChipItem from './components/ChipItem';
import { IChipListProps } from '../../types';

export const ChipList: React.FC<IChipListProps> = ({
    chips,
    selectedChip,
    onChipPressed,
    budget = -1,
    chipSize = 64
}) => {

    if (Object.keys(chips).length === 0)
        return null;

    return (
        <ul className="roulette-chips-list">
            {Object.entries(chips).map(([value, icon]) => (
                <ChipItem
                    key={value}
                    value={value}
                    icon={icon}
                    chipSize={chipSize}
                    isSelected={selectedChip === value}
                    isDisabled={budget === -1 ? false : Number(value) > budget}
                    onChipPressed={onChipPressed}
                />
            ))}
        </ul>
    );
};