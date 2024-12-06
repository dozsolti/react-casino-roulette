import React from 'react';
import 'react-casino-roulette/dist/index.css';

import ExampleBasicWheel from './examples/Wheel/ExampleBasicWheel';
import ExampleWheelAdvanced from './examples/Wheel/ExampleWheelAdvanced';

import ExampleBasicTable from './examples/Tables/ExampleBasicTable';
import ExampleTableWithChips from './examples/Tables/ExampleTableWithChips';
import ExampleTableReadOnly from './examples/Tables/ExampleTableReadOnly';
import ExampleTableAdvanced from './examples/Tables/ExampleTableAdvanced';

import './App.css';

export const App = () => {

  return (
    <div className='examples-container'>
      <h1 className='heading'>React Advanced Casino Roulette</h1>

      <h2>Basic examples</h2>
      <ExampleBasicWheel />
      <ExampleBasicTable />

      <hr />

      <h2>Table & Chips example</h2>
      <ExampleTableWithChips />
      <hr />
      <h2>ReadOnly Table example</h2>
      <p>Disable the table when the wheel is spinning.</p>
      <ExampleTableReadOnly />
      <hr />

      <h2>Advanced wheel</h2>
      <ExampleWheelAdvanced />
      <hr />
      <h2>Advanced Table example</h2>
      <ExampleTableAdvanced />
    </div>
  );
};
