export async function fetchExchangeRate() {
  try {
    const result = await fetch("/api/exchangerates/rates/a/gbp/?format=json");
    const json = await result.json();
    return json.rates[0].mid;
  } catch (err) {
    return console.log(err);
  }
}
