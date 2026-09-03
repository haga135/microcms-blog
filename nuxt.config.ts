// https://nuxt.com/docs/api/configuration/nuxt-config
const { API_KEY, SERVICE_DOMAIN, LINE_ACCESS_TOKEN } = process.env;

export default defineNuxtConfig({
  srcDir: "src/",

  // ▼ ここからスマホ対応のための設定を追加
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  // ▲ ここまでを追加

  runtimeConfig: {
    apiKey: API_KEY,
    serviceDomain: SERVICE_DOMAIN,
    lineAccessToken: LINE_ACCESS_TOKEN,
  },
  css: ["~/assets/css/reset.css", "~/assets/css/style.css"],
});
