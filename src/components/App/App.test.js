import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should not allow to input letters in user currency input', () => {
  render(<App />);
  const userCurrencyInput = screen.getByLabelText('You send');

  fireEvent.change(userCurrencyInput, { target: { value: 'm' } });
  expect(userCurrencyInput.value).toEqual('');
});