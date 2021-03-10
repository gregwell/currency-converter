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
  const isValidInputRegex = /^(\d+)[,.]?\d{0,2}$|^$/;

  const handleInputChange = (e, isUserCurrency ) => {
    if (!isValidInputRegex.test(e.target.value)) {
      return;
    }

    e.target.value = e.target.value.replace(/,/, '.'); 
    
    if (isUserCurrency) {
      setUserCurrency(e.target.value);
      e.target.value==="" ? setForeignCurrency("") : setForeignCurrency(currency(e.target.value).multiply(exchangeRate));
    } else { 
      setForeignCurrency(e.target.value);
      e.target.value==="" ? setUserCurrency("") : setUserCurrency(currency(e.target.value).divide(exchangeRate));
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
        <Input value={userCurrency} onChange={e => handleInputChange(e, true)} label="You send" country="GB"/>
        <Input value={foreignCurrency} onChange={e => handleInputChange(e, false)} label="They receive" country="PL"/>
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
