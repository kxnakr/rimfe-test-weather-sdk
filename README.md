# Acme Weather SDK

TypeScript client for the Acme Weather API.

```ts
import { WeatherClient } from "@acme/weather-sdk";
const client = new WeatherClient({ apiKey: process.env.ACME_KEY! });
const forecast = await client.forecast("Berlin");
```

See [the docs](docs/) for every option.
