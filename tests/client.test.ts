import { WeatherClient } from "../src/client";

test("needs a key", () => {
  expect(() => new WeatherClient({ apiKey: "" })).toThrow();
});
