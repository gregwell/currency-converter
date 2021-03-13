import React, { useState } from "react";
import currency from "currency.js";

import useStyles from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../Input/Input";
import { fetchExchangeRate } from "../../services/fetchExchangeRate";
import useAsync from "../../hooks/useAsync";

function App() {
  const classes = useStyles();

  const exchangeRate = useAsync(fetchExchangeRate, true);
  const [userCurrency, setUserCurrency] = useState([]);
  const [foreignCurrency, setForeignCurrency] = useState([]);
  const isValidInputRegex = /^(\d+)[,.]?\d{0,2}$|^$/;

  const handleInputChange = (e, isUserCurrency) => {
    if (!isValidInputRegex.test(e.target.value)) {
      return;
    }

    e.target.value = e.target.value.replace(/,/, ".");

    if (isUserCurrency) {
      setUserCurrency(e.target.value);
      e.target.value === ""
        ? setForeignCurrency("")
        : setForeignCurrency(
            currency(e.target.value).multiply(exchangeRate.value)
          );
    } else {
      setForeignCurrency(e.target.value);
      e.target.value === ""
        ? setUserCurrency("")
        : setUserCurrency(currency(e.target.value).divide(exchangeRate.value));
    }
  };

  return (
    <div className={classes.app}>
      <header>
        <Input
          value={userCurrency}
          onChange={(e) => handleInputChange(e, true)}
          label="You send"
          country="GB"
        />
        <Input
          value={foreignCurrency}
          onChange={(e) => handleInputChange(e, false)}
          label="They receive"
          country="PL"
        />
        <div className={classes.currencyInfoContainer}>
          {exchangeRate.status === "error" &&
            "Unfortunately we cannot handle your request now, please come back again in a moment!"}
          <>
            <span>1 GBP = </span>
            <span className={classes.bold}>
              {exchangeRate.status === "success" && (
                <>
                  {exchangeRate.value}
                  <span> PLN</span>
                </>
              )}
              {exchangeRate.status === "pending" && (
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
