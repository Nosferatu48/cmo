git config --global user.email "beeprorussia@gmail.com" && git config --global user.name "Viktoriya" && 

#!/bin/bash

# Создаём структуру папок
mkdir -p app/api/send-telegram
mkdir -p components
mkdir -p lib
mkdir -p public

# package.json
cat > package.json << 'EOF'
{
  "name": "cmo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "lucide-react": "^1.7.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sonner": "^2.0.7",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
EOF

# .gitignore
cat > .gitignore << 'EOF'
node_modules
.next
out
.env
.env.local
EOF

# vercel.json
cat > vercel.json << 'EOF'
{
  "framework": "nextjs"
}
EOF

# app/globals.css
cat > app/globals.css << 'EOF'
@import "tailwindcss";
@theme inline {
  --color-background: #ffffff;
  --color-foreground: #1d1d1f;
  --color-primary: #0071e3;
  --color-primary-foreground: #ffffff;
  --color-muted: #f5f5f7;
  --color-muted-foreground: #6e6e73;
  --color-border: #d2d2d7;
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: var(--color-background); color: var(--color-foreground); font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
EOF

# app/layout.tsx
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "Писарева Виктория — CMO" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{margin:0,padding:0,minHeight:"100vh",display:"flex",flexDirection:"column",backgroundColor:"#fff",color:"#1d1d1f",fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue',Arial,sans-serif",WebkitFontSmoothing:"antialiased"}}>
        <header style={{position:"sticky",top:0,zIndex:50,width:"100%",borderBottom:"1px solid #d2d2d7",backgroundColor:"rgba(255,255,255,0.8)",backdropFilter:"blur(12px)"}}>
          <div style={{maxWidth:"1024px",margin:"0 auto",padding:"0 16px",height:"56px",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Link href="/" style={{fontSize:"14px",fontWeight:500,color:"#6e6e73",textDecoration:"none"}}>Писарева Виктория — CMO</Link>
          </div>
        </header>
        <main style={{flex:1}}>{children}</main>
        <footer style={{borderTop:"1px solid #d2d2d7"}}>
          <div style={{maxWidth:"1024px",margin:"0 auto",padding:"24px 16px",textAlign:"center",fontSize:"12px",color:"#6e6e73"}}>© {new Date().getFullYear()} Писарева Виктория — CMO</div>
        </footer>
      </body>
    </html>
  );
}
EOF

# app/page.tsx
cat > app/page.tsx << 'EOF'
import { HeroSection } from "@/components/hero-section";
import { ExpertiseSection } from "@/components/expertise-section";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <ScrollToTop />
    </>
  );
}
EOF

# app/api/send-telegram/route.ts
cat > app/api/send-telegram/route.ts << 'EOF'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "Поля name и message обязательны" }, { status: 400 });
    }
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 500 });
    }
    const text = [
      "📩 *Новое сообщение с лендинга*", "",
      `*Имя:* ${body.name}`,
      `*Email:* ${body.email || "не указан"}`,
      `*Сообщение:*`, body.message,
    ].join("\n");
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
    if (!res.ok) return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
EOF

# lib/data.ts
cat > lib/data.ts << 'EOF'
export const contactInfo = {
  email: "beeprorussia@gmail.com",
  linkedIn: "https://linkedin.com/in/nosferatu48",
  telegram: "https://t.me/teloah_nosferatu",
  etagStore: "https://my.etag.store/nosferatu48",
};
export const cmoProfile = {
  name: "Писарева Виктория",
  title: "CMO / Head of Marketing",
  tagline: "Маркетинговая стратегия. Performance. Рост.",
  avatar: { src: "/avatar.jpg" },
};
export const expertiseAreas = [
  { title: "Маркетинговая стратегия", description: "Разработка комплексных маркетинговых стратегий, позиционирование и GTM-планы.", icon: "target" },
  { title: "Performance Marketing", description: "Управление сквозными воронками, оптимизация CAC/LTV, лидогенерация, ROMI 342%.", icon: "trending-up" },
  { title: "Маркетплейсы", description: "Управление продажами на Wildberries, Ozon, Яндекс.Маркет, Lamoda.", icon: "bar-chart-3" },
  { title: "Команда и бюджет", description: "Построение отделов до 20 человек, бюджеты до 11 млн ₽/мес.", icon: "users" },
  { title: "AI & Automation", description: "ChatGPT, Claude, Midjourney, Make, n8n — автоматизация маркетинга.", icon: "bot" },
  { title: "Data-Driven Marketing", description: "Power BI, Looker Studio, сквозная аналитика, ROMI, LTV, CAC.", icon: "bar-chart-4" },
];
export const experience = [
  { company: "VALLEYSHOES", position: "CMO", period: "2022 — н.в.", description: "Управление маркетингом fashion-бренда, стратегия digital-маркетинга, маркетплейсы.", icon: "line-chart" },
  { company: "ZorbasMedia", position: "CMO", period: "2021-2022", description: "Маркетинговая стратегия, performance marketing, управление командой.", icon: "rocket" },
  { company: "Click2Money", position: "Head of SMM", period: "2020-2021", description: "SMM, лидогенерация, CRM-маркетинг, контент-стратегия.", icon: "user-plus" },
  { company: "Предыдущий опыт", position: "Digital-маркетолог", period: "2018-2020", description: "Digital-маркетинг, аналитика, growth marketing.", icon: "package" },
];
export const education = {
  university: { name: "Санкт-Петербургский институт гуманитарного образования", faculty: "Экономики и управления", specialty: "Государственное и муниципальное управление", year: "2013" },
  courses: [
    { title: "SMM 2.0", source: "SendPulse", icon: "megaphone" },
    { title: "Визуализация данных", source: "Нетология", icon: "bar-chart-3" },
    { title: "Digital и PR e-commerce", source: "Сидорин Лаб", icon: "shopping-bag" },
    { title: "Контент-маркетинг", source: "MaEd", icon: "file-text" },
    { title: "Интернет-маркетинг для B2B", source: "MaEd", icon: "target" },
    { title: "Яндекс.Маркет", source: "2023", icon: "globe" },
  ],
};
export const achievements = [
  { value: "8+", label: "Лет опыта", description: "В CMO и Head of Marketing" },
  { value: "342%", label: "ROMI", description: "Средний возврат инвестиций" },
  { value: "66 млн ₽+", label: "Выручка", description: "Сгенерировано под управлением" },
  { value: "20", label: "Человек в команде", description: "Максимальный размер команды" },
];
EOF

echo "Готово! Все файлы созданы."
