export interface ClientOptions {
  /** API key from the Acme dashboard. */
  apiKey: string;
  /** Request timeout in milliseconds. */
  timeoutMs?: number;
  /** Number of retries for 5xx responses. */
  retries?: number;
  /** Override the API host, for example a regional endpoint. */
  baseUrl?: string;
}

export class WeatherClient {
  private readonly timeoutMs: number;
  private readonly retries: number;

  constructor(private readonly options: ClientOptions) {
    if (!options.apiKey) throw new Error("apiKey is required");
    this.timeoutMs = options.timeoutMs ?? 30_000;
    this.retries = options.retries ?? 2;
  }

  async forecast(city: string, days = 3) {
    if (days < 1 || days > 14) throw new RangeError("days must be between 1 and 14");
    return this.request(`/forecast?city=${encodeURIComponent(city)}&days=${days}`);
  }

  async current(city: string) {
    return this.request(`/current?city=${encodeURIComponent(city)}`);
  }

  private async request(path: string) {
    let attempt = 0;
    while (true) {
      const res = await fetch(`${this.options.baseUrl ?? "https://api.acme-weather.dev/v1"}${path}`, {
        headers: { Authorization: `Bearer ${this.options.apiKey}` },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (res.status < 500 || attempt >= this.retries) return res.json();
      attempt += 1;
    }
  }
}
