# Configuration

`new WeatherClient(options)` accepts:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | string | required | API key from the Acme dashboard. |
| `baseUrl` | string | `https://api.acme-weather.dev/v1` | Override the API host, for example a regional endpoint. |
| `timeoutMs` | number | `30000` | Request timeout in milliseconds. |
| `retries` | number | `2` | Retries for 5xx responses. |

The client throws `Error("apiKey is required")` when the key is missing.
