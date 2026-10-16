# Configuration

`new WeatherClient(options)` accepts:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `apiKey` | string | required | API key from the Acme dashboard. |
| `timeoutMs` | number | `10000` | Request timeout in milliseconds. |
| `retries` | number | `2` | Retries for 5xx responses. |

The client throws `Error("apiKey is required")` when the key is missing.
