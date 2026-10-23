import axios from "axios";

export const isStaging = window?.APP_DATA?.mode === "staging";

const baseURL = "https://manufacturer.360logistics.kz/wp-json/";

export const api = axios.create({
  baseURL,
});

async function waitForNonce(signal) {
  const deadline = Date.now() + 10_000;

  while (true) {
    if (signal?.aborted) {
      throw new axios.CanceledError();
    }

    const nonce = window.APP_DATA?.nonce;
    if (nonce) return nonce;

    if (Date.now() >= deadline) {
      throw new Error("Не удалось дождаться APP_DATA.nonce. Обновите страницу.");
    }

    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

api.interceptors.request.use(async (config) => {
  const nonce = await waitForNonce(config.signal);
  config.headers.set("X-WP-Nonce", nonce);
  return config;
});
