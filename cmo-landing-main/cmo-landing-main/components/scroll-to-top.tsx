"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 50,
        width: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid #d2d2d7",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "all 0.2s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-label="Наверх"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#1d1d1f">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
