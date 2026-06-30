"use client";

import Image from "next/image";
import { cmoProfile } from "@/lib/data";

export function HeroSection() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f7", overflow: "hidden" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "128px 16px", textAlign: "center" }}>
        <div style={{ marginBottom: "48px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "128px", height: "128px", overflow: "hidden", borderRadius: "50%", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: "4px solid white" }}>
            <Image
              src={cmoProfile.avatar.src}
              alt={cmoProfile.name}
              width={144}
              height={144}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#1d1d1f", margin: 0 }}>
            {cmoProfile.name}
          </h1>
          <p style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 300, color: "#6e6e73", margin: 0 }}>
            {cmoProfile.title}
          </p>
          <p style={{ maxWidth: "576px", margin: "0 auto", fontSize: "1.125rem", color: "#6e6e73", opacity: 0.7 }}>
            {cmoProfile.tagline}
          </p>
        </div>
        <div style={{ marginTop: "48px" }}>
          <a
            href="#contacts"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", borderRadius: "9999px", backgroundColor: "#0071e3", padding: "12px 32px", fontSize: "1rem", fontWeight: 500, color: "white", textDecoration: "none", transition: "background-color 0.2s" }}
          >
            Связаться
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
