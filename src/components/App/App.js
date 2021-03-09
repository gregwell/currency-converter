import React, { useEffect, useState } from 'react';
import currency from 'currency.js';

import useStyles from './styles';
import Input from '../Input/Input';
import { getExchangeRate } from '../../services/exchangeRate';

function App() {
  const classes = useStyles();

  const [exchangeRate, setExchangeRate] = useState(null);
  const [userCurrency, setUserCurrency] = useState([]);
  const [foreignCurrency, setForeignCurrency] = useState([]);
  const isValidInputRegex = /^(\d+)[,.]?\d{0,2}$/;

  const handleInputChange = (e, isUserCurrency ) => {
    if (!(isValidInputRegex.test(e.target.value) || e.target.value==="")) {
      return;
    }
    let valueWithDot = e.target.value.replace(/,/, '.'); 
    if (isUserCurrency) {
      setUserCurrency(valueWithDot);
      valueWithDot==="" ? setForeignCurrency("") : setForeignCurrency(currency(valueWithDot).multiply(exchangeRate));
    } else { 
      setForeignCurrency(valueWithDot);
      valueWithDot==="" ? setUserCurrency("") : setUserCurrency(currency(valueWithDot).divide(exchangeRate));
    }
  }

  useEffect(() => {
    let mounted = true;
    getExchangeRate()
      .then(fetchedExchangeRate => {
        if(mounted) {
          setExchangeRate(fetchedExchangeRate)
        }
      })
    return () => mounted = false;
  },[])

  return (
    <div className={classes.app}>
      <header>
        <Input value={userCurrency} onChange={e => handleInputChange(e, true)} label="You send" country="GB" placeholder="User Currency"/>
        <Input value={foreignCurrency} onChange={e => handleInputChange(e, false)} label="They receive" country="PL" placeholder="Foreign Currency"/>
         { exchangeRate != null &&
          (
            <div className={classes.currencyInfoContainer}>
              1 GBP = <span className={classes.bold}>{currency(exchangeRate) + " PLN"}</span>
              <p className={classes.bold}>No transfer fee</p>
            </div>
          )}
      </header>
    </div>
  );
}

export default App;
