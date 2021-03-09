import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should not allow to input letters in user currency input', () => {
  const { getByLabelText } = render(<App />)
  const userCurrencyInput = getByLabelText('You send');

  fireEvent.change(userCurrencyInput, { target: { value: 'm' } });
  expect(userCurrencyInput.value).toEqual('');
});