export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const accessToken = config.lineChannelAccessToken;

  // microCMSのWebhookイベントが「公開（PUBLISH）」または「更新」のときだけ処理する
  if (body.type === "PUBLISH" || body.type === "UPDATE") {
    const content = body.contents?.new;
    const title = content?.title || "新しい記事";
    const slug = content?.id || "";
    // ブログの記事詳細ページへのリンク（ご自身のドメインに合わせて変更してください）
    const articleUrl = `https://main.d29tvknk7nd8pe.amplifyapp.com//posts/${slug}`;

    // LINEに送るメッセージの組み立て
    const messageText = `ブログに新しい記事が公開されました！\n\n「${title}」\n\n▼詳細はこちら\n${articleUrl}`;

    try {
      // LINE Messaging API（一斉送信 / ブロードキャスト）へリクエスト
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
    } catch (error) {
      console.log("LINE送信エラー:", error);
    }
  }

  return { status: "ok" };
});
