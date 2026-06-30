"use client";

import { expertiseAreas, achievements } from "@/lib/data";
import { Target, TrendingUp, Users, BarChart3, Bot, LineChart } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  "bar-chart-3": BarChart3,
  bot: Bot,
  "bar-chart-4": LineChart,
};

export function ExpertiseSection() {
  return (
    <section style={{ padding: "128px 0" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", margin: 0 }}>
            Экспертиза
          </h2>
          <p style={{ marginTop: "16px", fontSize: "1.125rem", color: "#6e6e73" }}>
            Ключевые компетенции для роста вашего бизнеса
          </p>
        </div>

        <div style={{ marginTop: "64px", display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {expertiseAreas.map((area) => {
            const Icon = iconMap[area.icon];
            return (
              <div key={area.title} style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "24px", transition: "box-shadow 0.2s" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                    {Icon && <Icon size={24} />}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>{area.title}</h3>
                    <p style={{ marginTop: "8px", fontSize: "0.875rem", lineHeight: 1.6, color: "#6e6e73" }}>{area.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "96px", textAlign: "center" }}>
          <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", margin: 0 }}>
            Цифры и результаты
          </h3>
          <p style={{ marginTop: "12px", fontSize: "1.125rem", color: "#6e6e73" }}>
            Опыт, подтверждённый проектами
          </p>
        </div>

        <div style={{ marginTop: "48px", display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {achievements.map((stat) => (
            <div key={stat.label} style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "32px", textAlign: "center", transition: "box-shadow 0.2s" }}>
              <p style={{ fontSize: "clamp(2rem, 3vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#0071e3", margin: 0 }}>
                {stat.value}
              </p>
              <p style={{ marginTop: "12px", fontSize: "1rem", fontWeight: 500, color: "#1d1d1f" }}>{stat.label}</p>
              <p style={{ marginTop: "4px", fontSize: "0.875rem", color: "#6e6e73" }}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
