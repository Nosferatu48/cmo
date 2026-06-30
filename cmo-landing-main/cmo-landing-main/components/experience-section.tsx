"use client";

import { experience } from "@/lib/data";
import { LineChart, Rocket, UserPlus, Package } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "line-chart": LineChart,
  rocket: Rocket,
  "user-plus": UserPlus,
  package: Package,
};

export function ExperienceSection() {
  return (
    <section style={{ padding: "128px 0" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", margin: 0 }}>
            Опыт работы
          </h2>
          <p style={{ marginTop: "16px", fontSize: "1.125rem", color: "#6e6e73" }}>
            Ключевые места работы и достижения
          </p>
        </div>

        <div style={{ marginTop: "64px", display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {experience.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.company} style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "24px", transition: "box-shadow 0.2s" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                    {Icon && <Icon size={24} />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>{item.company}</h3>
                    <p style={{ marginTop: "2px", fontSize: "0.875rem", fontWeight: 500, color: "#0071e3", margin: 0 }}>{item.position}</p>
                    <span style={{ display: "inline-block", marginTop: "4px", borderRadius: "9999px", backgroundColor: "#f5f5f7", padding: "2px 10px", fontSize: "0.75rem", color: "#6e6e73" }}>
                      {item.period}
                    </span>
                    <p style={{ marginTop: "12px", fontSize: "0.875rem", lineHeight: 1.6, color: "#6e6e73" }}>{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
