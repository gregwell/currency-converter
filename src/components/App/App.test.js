import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should not allow to input letters in user currency input', () => {
  const { getByPlaceholderText } = render(<App />)
  const userCurrencyInput = getByPlaceholderText(/User Currency/i);

  fireEvent.change(userCurrencyInput, { target: { value: 'm' } });
  expect(userCurrencyInput.value).toEqual('');
});