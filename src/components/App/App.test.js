import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";

it("renders without crashing", () => {
  render(<App />);
});

const setup = () => {
  render(<App />);
  const userCurrencyInput = screen.getByRole("textbox", { name: /you send/i });
  const foreignCurrencyInput = screen.getByRole("textbox", {
    name: /they receive/i,
  });
  return {
    userCurrencyInput,
    foreignCurrencyInput,
  };
};

it("should not allow to input letters in any of the two text fields", () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: "m" } });
  expect(userCurrencyInput.value).toEqual("");
  fireEvent.change(foreignCurrencyInput, { target: { value: "m" } });
  expect(foreignCurrencyInput.value).toEqual("");
});

it("should replace commas to dots before displaying them in text fields", () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: "30," } });
  expect(userCurrencyInput.value).toEqual("30.");

  fireEvent.change(foreignCurrencyInput, { target: { value: "30," } });
  expect(foreignCurrencyInput.value).toEqual("30.");
});

it("should not allow to input decimal point before inputting 0", () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: "." } });
  expect(userCurrencyInput.value).toEqual("");

  fireEvent.change(foreignCurrencyInput, { target: { value: "." } });
  expect(foreignCurrencyInput.value).toEqual("");
});

it("should not allow to input more than 2 digits after decimal point", () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: "2.22" } });
  fireEvent.change(userCurrencyInput, { target: { value: "2.222" } });
  expect(userCurrencyInput.value).toEqual("2.22");

  fireEvent.change(foreignCurrencyInput, { target: { value: "2.22" } });
  fireEvent.change(foreignCurrencyInput, { target: { value: "2.222" } });
  expect(foreignCurrencyInput.value).toEqual("2.22");
});

it("should not allow to input a digit between 0 and decimal point", () => {
  const { userCurrencyInput, foreignCurrencyInput } = setup();

  fireEvent.change(userCurrencyInput, { target: { value: "01" } });
  expect(userCurrencyInput.value).toEqual("0");

  fireEvent.change(foreignCurrencyInput, { target: { value: "01" } });
  expect(foreignCurrencyInput.value).toEqual("0");
});
