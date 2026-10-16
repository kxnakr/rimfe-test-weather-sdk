export interface ClientOptions {
  /** API key from the Acme dashboard. */
  apiKey: string;
  /** Request timeout in milliseconds. */
  timeoutMs?: number;
  /** Number of retries for 5xx responses. */
  retries?: number;
  /** Appended to the User-Agent header. */
  userAgent?: string;
}

export class WeatherClient {
  private readonly timeoutMs: number;
  private readonly retries: number;

  constructor(private readonly options: ClientOptions) {
    if (!options.apiKey) throw new Error("apiKey is required");
    this.timeoutMs = options.timeoutMs ?? 10_000;
    this.retries = options.retries ?? 2;
  }

  async forecast(city: string, days = 3) {
    if (days < 1 || days > 7) throw new RangeError("days must be between 1 and 7");
    return this.request(`/forecast?city=${encodeURIComponent(city)}&days=${days}`);
  }

  async current(city: string) {
    return this.request(`/current?city=${encodeURIComponent(city)}`);
  }

  private async request(path: string) {
    let attempt = 0;
    while (true) {
      const res = await fetch(`https://api.acme-weather.dev/v1${path}`, {
        headers: {
          Authorization: `Bearer ${this.options.apiKey}`,
          "User-Agent": `acme-weather-sdk/1.2.0 ${this.options.userAgent ?? ""}`.trim(),
        },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (res.status < 500 || attempt >= this.retries) return res.json();
      attempt += 1;
    }
  }
}

/** Returns current conditions for a city. */
export async function getCurrent(city: string, units: "metric" | "imperial" = "metric") {
  return new WeatherClient({ apiKey: process.env.WEATHER_API_KEY ?? "" }).request(`/current?city=${city}&units=${units}`);
}
