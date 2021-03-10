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
  expect(userCurrencyInput.value).toEqual('');
  fireEvent.change(foreignCurrencyInput, { target: { value: 'm' } });
  expect(foreignCurrencyInput.value).toEqual('');
});

it('should replace commas to dots before displaying them in text fields', () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: '30,' } });
  expect(userCurrencyInput.value).toEqual('30.');

  fireEvent.change(foreignCurrencyInput, { target: { value: '30,' } });
  expect(foreignCurrencyInput.value).toEqual('30.');
});

it('should not allow to input dot or comma before inputting 0', () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: '.' } });
  expect(userCurrencyInput.value).toEqual('');

  fireEvent.change(foreignCurrencyInput, { target: { value: '.' } });
  expect(foreignCurrencyInput.value).toEqual('');
});

