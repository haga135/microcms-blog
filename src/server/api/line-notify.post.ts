export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accessToken = config.lineChannelAccessToken;

  // LINE Messaging APIのプッシュ通知エンドポイント
  const response = await $fetch(
    "https://api.line.me/v2/bot/message/broadcast",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: {
        messages: [
          {
            type: "text",
            text: "ブログに新しい記事が公開されました！",
          },
        ],
      },
    },
  );

  return { success: true, response };
});
