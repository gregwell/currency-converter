import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import Input from '../Input/Input';
import { getExchangeRate } from '../../services/exchangeRate';

function App() {
  const classes = useStyles();

  const [exchangeRate, setExchangeRate] = useState(null);

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
        <Input label="You send" country="GB"/>
        <Input label="They receive" country="PL"/>
        <div className={classes.currencyInfoContainer}>
          1 GBP = <span className={classes.bold}>{exchangeRate + " PLN"}</span>
          <p className={classes.bold}>No transfer fee</p>
        </div>
      </header>
    </div>
  );
}

export default App;
