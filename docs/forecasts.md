# Forecasts

`client.forecast(city, days)` returns a daily forecast.

- `city`: city name, for example `"Berlin"`.
- `days`: number of days, from 1 to 7. Defaults to 3.

Values outside 1 to 7 throw a `RangeError`.

`client.current(city)` returns current conditions.
