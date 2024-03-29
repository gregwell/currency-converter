import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchExchangeRate } from "../../services/fetchExchangeRate";
import { messages } from "../../constants/inputConstants";

jest.mock("../../services/fetchExchangeRate");

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

it("should display the exchange rate", async () => {
  const expected = {
    table: "A",
    currency: "funt szterling",
    code: "GBP",
    rates: [
      {
        no: "052/A/NBP/2021",
        effectiveDate: "2021-03-17",
        mid: 5.3758,
      },
    ],
  }

  const exchangeRate = expected.rates[0].mid;
  fetchExchangeRate.mockResolvedValueOnce(exchangeRate);

  render(<App />);

  expect(fetchExchangeRate).toHaveBeenCalledTimes(1);
  expect(fetchExchangeRate).toHaveBeenCalledWith();

  await waitFor(() => screen.getByText("5.3758"));
  expect(screen.getByText("5.3758")).toBeInTheDocument();
});

it("should display error message on fetching rate failure", async () => {
  fetchExchangeRate.mockRejectedValueOnce("Error!");

  render(<App />);

  expect(fetchExchangeRate).toHaveBeenCalledTimes(1);
  expect(fetchExchangeRate).toHaveBeenCalledWith();

  await waitFor(() => screen.getByText(messages.errorMessage));
  expect(screen.getByText(messages.errorMessage)).toBeInTheDocument();
});
