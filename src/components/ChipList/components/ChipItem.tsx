import React from 'react'
import { classNames } from '../../../libs'
import "./ChipItem.css";
import { IChipListProps } from '../../../types';
import { calculateFontSize } from '../utils/chipItem';

interface IChipItemProps {
    value: string;
    icon: any;
    chipSize: IChipListProps['chipSize'];
    onChipPressed: IChipListProps['onChipPressed'];
    isSelected: boolean;
    isDisabled: boolean;
}

export default function ChipItem({ value, icon, chipSize = 64, onChipPressed, isSelected, isDisabled }: IChipItemProps) {
    return (
        <li
            className={
                classNames({
                    'active': isSelected && !isDisabled,
                    'disabled': isDisabled,
                })
            }
            onClick={() => !isDisabled && onChipPressed?.(value)}
        >
            <img width={chipSize} height={chipSize} src={icon} alt={`Chip of value ${value}`} />
            <p style={{ fontSize: calculateFontSize(value, chipSize) + 'px' }}>{value}</p>
        </li>
    )
}
