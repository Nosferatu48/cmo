"use client";

import { education } from "@/lib/data";
import { GraduationCap, Megaphone, BarChart3, ShoppingBag, FileText, Target, Globe } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  "graduation-cap": GraduationCap,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  "shopping-bag": ShoppingBag,
  "file-text": FileText,
  target: Target,
  globe: Globe,
};

export function EducationSection() {
  return (
    <section style={{ padding: "128px 0" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", margin: 0 }}>
            Образование
          </h2>
          <p style={{ marginTop: "16px", fontSize: "1.125rem", color: "#6e6e73" }}>
            Высшее образование и ключевые курсы
          </p>
        </div>

        <div style={{ marginTop: "64px", display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "24px", transition: "box-shadow 0.2s", gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                <GraduationCap size={24} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>{education.university.name}</h3>
                <p style={{ marginTop: "2px", fontSize: "0.875rem", fontWeight: 500, color: "#0071e3", margin: 0 }}>{education.university.faculty}</p>
                <p style={{ marginTop: "4px", fontSize: "0.875rem", lineHeight: 1.6, color: "#6e6e73" }}>{education.university.specialty}</p>
                <span style={{ display: "inline-block", marginTop: "8px", borderRadius: "9999px", backgroundColor: "#f5f5f7", padding: "2px 10px", fontSize: "0.75rem", color: "#6e6e73" }}>
                  {education.university.year}
                </span>
              </div>
            </div>
          </div>

          {education.courses.map((course) => {
            const Icon = iconMap[course.icon];
            return (
              <div key={course.title} style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "24px", transition: "box-shadow 0.2s" }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                    {Icon && <Icon size={24} />}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>{course.title}</h3>
                    <p style={{ marginTop: "4px", fontSize: "0.875rem", color: "#6e6e73" }}>{course.source}</p>
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
