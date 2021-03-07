import useStyles from './styles';
import Input from '../Input/Input';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <header>
        <Input label="You send" country="GB" currencyCode="GBP"/>
        <Input label="They receive" country="PL" currencyCode="PLN"/>
        <div className={classes.currencyInfoContainer}>
          1 GBP = <span className={classes.bold}>3.67 PLN</span>
          <p className={classes.bold}>No transfer fee</p>
        </div>
      </header>
    </div>
  );
}

export default App;
