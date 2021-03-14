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
} from "../../constants/inputConstants";

function App() {
  const classes = useStyles();

  const exchangeRate = useAsync(fetchExchangeRate, true);
  const [userCurrencyAmount, setUserCurrencyAmount] = useState([]);
  const [foreignCurrencyAmount, setForeignCurrencyAmount] = useState([]);
  const isValidInputRegex = /^(\d+)[,.]?\d{0,2}$|^$/;

  const handleInputChange = (e, isUserCurrency) => {
    if (!isValidInputRegex.test(e.target.value)) {
      return;
    }

    const value = e.target.value.replace(/,/, ".");

    if (isUserCurrency) {
      setUserCurrencyAmount(value);
      value === ""
        ? setForeignCurrencyAmount("")
        : setForeignCurrencyAmount(
            currency(value).multiply(exchangeRate.value)
          );
    } else {
      setForeignCurrencyAmount(value);
      value === ""
        ? setUserCurrencyAmount("")
        : setUserCurrencyAmount(currency(value).divide(exchangeRate.value));
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
            <span>1 GBP = </span>
            <span className={classes.bold}>
              {exchangeRate.status === statusNames.success && (
                <>
                  {exchangeRate.value}
                  <span> PLN</span>
                </>
              )}
              {exchangeRate.status === statusNames.pending && (
                <>
                  <span>5.0000 PLN</span>
                  <CircularProgress size="1rem" />
                </>
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
