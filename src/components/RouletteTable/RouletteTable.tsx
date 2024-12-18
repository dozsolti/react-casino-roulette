import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import type { FC, MouseEvent } from 'react';

import { ZeroBets } from './ZeroBets';
import { NumberBets } from './NumberBets';
import { Columns } from './Columns';
import { Dozens } from './Dozens';
import { BottomBets } from './BottomBets';

import { RouletteTableContext } from '../../context';
import { ACTION_TYPES } from '../../constants';
import config from '../../config/table.json';
import { hasOwn } from '../../utills';
import { classNames } from '../../libs';

import './RouletteTable.css';
import './RouletteTableCells.css';
import { BetId, IRouletteTableProps } from '../../types';

export const RouletteTable: FC<IRouletteTableProps> = ({
  onBet,
  bets,
  chips,
  layoutType = 'european',
  readOnly = false,
  height = '368px',
  isDebug,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current === null || readOnly) {
      return;
    }

    const listener = (event: Event) => {
      const highlightElement = (event.target as HTMLDivElement)?.closest(
        '[data-highlight]',
      );
      const highlightData = (highlightElement as HTMLDivElement)?.dataset
        ?.highlight;

      const betElement = (event.target as HTMLDivElement)?.closest(
        '[data-bet]',
      );
      const betData = (betElement as HTMLDivElement)?.dataset?.bet;

      const action = ((highlightElement ?? betElement) as HTMLDivElement)
        ?.dataset?.action;

      if (
        (highlightData === undefined || highlightData === '') &&
        (betData === undefined || betData === '')
      ) {
        console.error('No data in [data-bet] or [data-highlight]');
        return;
      }

      if (action === undefined || action === '') {
        console.error('Action is undefined');
        return;
      }

      const isActionSupported = Object.keys(ACTION_TYPES).includes(action);

      if (isActionSupported === false) {
        console.error('Unsupported action', action);
        return;
      }

      /* Checks are done */

      const payloadData = (highlightData ?? betData) as string;

      const getPayload = () => {
        const firstId = payloadData.split('-')[0];

        const isPayloadInConfig = hasOwn(config, firstId);

        if (isPayloadInConfig === true) {
          return config[firstId as keyof typeof config].map(
            (item) => `${item}`,
          );
        }

        return payloadData.split('-').map((item) => item);
      };

      const payload = getPayload();

      onBet({
        bet: action as keyof typeof ACTION_TYPES,
        payload,
        id: payloadData as BetId,
      });
    };

    tableRef.current.addEventListener('click', listener);

    const tableRefCurrent = tableRef.current;

    return () => {
      tableRefCurrent?.removeEventListener('click', listener);
    };
  }, [onBet, readOnly]);

  const doHighlight = (betId: string) => {
    if (tableRef.current === null) {
      return;
    }

    const hoverClass = 'item-hover';

    const element = tableRef.current.querySelector(`[data-bet="${betId}"]`);

    element?.classList.toggle(hoverClass);
  };

  const handleBetCatcherHover = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const highlightData = (event.currentTarget as HTMLDivElement).dataset
        .highlight;
      const toHighlight = highlightData?.split('-');

      const firstHighlight = toHighlight?.[0];

      if (firstHighlight === undefined || readOnly) {
        return;
      }

      const isFromConfig = Object.keys(config).includes(firstHighlight);

      if (isFromConfig === true) {
        doHighlight(firstHighlight);

        if (config[firstHighlight as keyof typeof config] === undefined) {
          console.error('Config does not contain the key', firstHighlight);
          return;
        }

        config[firstHighlight as keyof typeof config].forEach((bet) =>
          doHighlight(`${bet}`),
        );

        return;
      }

      toHighlight?.forEach((element) => {
        doHighlight(element);
      });
    },
    [readOnly],
  );

  const containerStyles = useMemo(() => {
    return {
      height,
      fontSize: `calc(${height} * 0.05)`,
      '--roulette-romb-size': `calc(${height} * 0.09)`,
    }
  }, [height])

  const contextValue = useMemo(
    () => ({ bets, chips, onBetCatcherHover: handleBetCatcherHover }),
    [bets, handleBetCatcherHover],
  );

  return (
    <RouletteTableContext.Provider value={contextValue}>
      <div
        className={classNames('roulette-table-container', { debug: isDebug, 'read-only': readOnly })}
        style={containerStyles}

        ref={tableRef}
      >
        <section className="roulette-table-container-first">
          <ZeroBets layoutType={layoutType} />
          <NumberBets layoutType={layoutType} />
          <Columns />
        </section>
        <section className="roulette-table-container-second">
          <Dozens />
        </section>
        <div className="roulette-table-container-third">
          <BottomBets />
        </div>
      </div>
    </RouletteTableContext.Provider>
  );
};