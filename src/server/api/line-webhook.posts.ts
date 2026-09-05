export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const accessToken = config.lineChannelAccessToken;

  if (body.type === "PUBLISH" || body.type === "UPDATE") {
    const content = body.contents?.new;
    const title = content?.title || "新しい記事";
    const slug = content?.id || ""; // またはmicroCMSで設定しているスラッグ用のフィールド名

    // ご自身の実際のドメインと /${slug} を結合
    const articleUrl = `https://main.d29tvknk7nd8pe.amplifyapp.com/${slug}`;

    const messageText = `ブログに新しい記事が公開されました！\n\n「${title}」\n\n▼詳細はこちら\n${articleUrl}`;

    try {
      await $fetch("https://api.line.me/v2/bot/message/broadcast", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          messages: [
            {
              type: "text",
              text: messageText,
            },
          ],
        },
      });
    } catch (error: any) {
      console.error("LINE送信詳細エラー:", error?.data || error);
    }
  }

  return { status: "ok" };
});
