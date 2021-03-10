import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

const setup = () => {
  render(<App />);
  const userCurrencyInput = screen.getByRole('textbox', { name: /you send/i });
  const foreignCurrencyInput = screen.getByRole('textbox', { name: /they receive/i });
  return {
    userCurrencyInput,
    foreignCurrencyInput
  }
}

it('should not allow to input letters in any of the two text fields', () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: 'm' } });
  fireEvent.change(foreignCurrencyInput, { target: { value: 'm' } });
  expect(userCurrencyInput.value).toEqual('');
  expect(foreignCurrencyInput.value).toEqual('');
});