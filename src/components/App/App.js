import React, { useState } from "react";
import currency from "currency.js";

import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../Input/Input";
import { fetchExchangeRate } from "../../services/fetchExchangeRate";
import useAsync from "../../hooks/useAsync";

import {
  statusNames,
  messages,
  countryShorts,
  inputLabels,
  currencies
} from "../../constants/inputConstants";

function App() {
  const classes = useStyles();

  const exchangeRate = useAsync(fetchExchangeRate, true);
  const [userCurrencyAmount, setUserCurrencyAmount] = useState("");
  const [foreignCurrencyAmount, setForeignCurrencyAmount] = useState("");
  const isValidInputRegex = /^(\d+)[,.]?\d{0,2}$|^$/;

  const handleInputChange = (e, isUserCurrency) => {
    if (!isValidInputRegex.test(e.target.value)) {
      return;
    }

    let value = e.target.value.replace(/,/, ".").replace(/^0\d$/, "0");

    if (isUserCurrency) {
      setUserCurrencyAmount(value);
      if (value !== "") {
        value = currency(value).multiply(exchangeRate.value).value.toString();
      }
      setForeignCurrencyAmount(value);
    } else {
      setForeignCurrencyAmount(value);
      if (value !== "") {
        value = currency(value).divide(exchangeRate.value).value.toString();
      }
      setUserCurrencyAmount(value);
    }
  };

  return (
    <div className={classes.app}>
      <header>
        <Input
          value={userCurrencyAmount}
          onChange={(e) => handleInputChange(e, true)}
          label={inputLabels.userCurrencyInput}
          country={countryShorts.GB}
        />
        <Input
          value={foreignCurrencyAmount}
          onChange={(e) => handleInputChange(e, false)}
          label={inputLabels.foreignCurrencyInput}
          country={countryShorts.PL}
        />
        <div className={classes.currencyInfoContainer}>
          {exchangeRate.status === statusNames.error && messages.errorMessage}
          <>
            <span>1 {currencies.GB} = </span>
            <span className={classes.bold}>
              {exchangeRate.status === statusNames.success && (
                <>
                  {exchangeRate.value}
                  <span> {currencies.PL}</span>
                </>
              )}
              {exchangeRate.status === statusNames.pending && (
                <CircularProgress size="1rem" />
              )}
            </span>
            <p className={classes.bold}>No transfer fee</p>
          </>
        </div>
      </header>
    </div>
  );
}

export default App;
