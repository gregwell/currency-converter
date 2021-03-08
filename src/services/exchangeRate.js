export function getExchangeRate() {
    return fetch('http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json')
      .then(data => data.json())
      .then(data => data.rates[0].mid)
  }