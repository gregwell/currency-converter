import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Input from '../Input/Input';
import { getExchangeRate } from '../../services/exchangeRate';

function App() {
  const classes = useStyles();

  const [exchangeRate, setExchangeRate] = useState(null);
  const [userCurrency, setUserCurrency] = useState([]);
  const [foreignCurrency, setForeignCurrency] = useState([]);
  const isValidInputRegex = /^\d+[,.]?\d{0,2}$/;

  const handleUserCurrencyChange = (e) => {
    if (isValid(e.target.value)) {
      let valueWithDot = e.target.value.replace(/,/, '.') 
      setUserCurrency(valueWithDot);
      valueWithDot==="" ? setForeignCurrency("") : setForeignCurrency(valueWithDot*exchangeRate);
    }
  }

  const handleForeignCurrencyChange = (e) => {
    if (isValid(e.target.value)) {
      let valueWithDot = e.target.value.replace(/,/, '.') 
      setForeignCurrency(valueWithDot);
      valueWithDot==="" ? setUserCurrency("") : setUserCurrency(valueWithDot/exchangeRate);
    }
  }

  const isValid = (input) => {
    if (isValidInputRegex.test(input) || input==="") {
      return true;
    } else {
      return false;
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
        <Input value={userCurrency} onChange={handleUserCurrencyChange} label="You send" country="GB"/>
        <Input value={foreignCurrency} onChange={handleForeignCurrencyChange} label="They receive" country="PL"/>
         { exchangeRate != null &&
          (
            <div className={classes.currencyInfoContainer}>
              1 GBP = <span className={classes.bold}>{exchangeRate + " PLN"}</span>
              <p className={classes.bold}>No transfer fee</p>
            </div>
          )}
      </header>
    </div>
  );
}

export default App;
