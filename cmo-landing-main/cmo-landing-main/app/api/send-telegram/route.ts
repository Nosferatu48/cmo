import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: "Поля name и message обязательны" },
        { status: 400 }
      );
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: "Telegram не настроен" },
        { status: 500 }
      );
    }

    const text = [
      `📩 *Новое сообщение с лендинга*`,
      ``,
      `*Имя:* ${body.name}`,
      `*Email:* ${body.email || "не указан"}`,
      `*Сообщение:*`,
      body.message,
    ].join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Ошибка отправки в Telegram" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
