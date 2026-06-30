"use client";

import { contactInfo } from "@/lib/data";
import { Mail, Globe, Send, ExternalLink, MessagesSquare } from "lucide-react";
import { useState } from "react";

const contacts = [
  { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}`, icon: Mail },
  { label: "LinkedIn", value: contactInfo.linkedIn.replace("https://", ""), href: contactInfo.linkedIn, icon: Globe },
  { label: "Telegram", value: contactInfo.telegram.replace("https://t.me/", "@"), href: contactInfo.telegram, icon: Send },
  { label: "Все соцсети", value: contactInfo.etagStore.replace("https://", ""), href: contactInfo.etagStore, icon: ExternalLink },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: senderEmail, message }),
      });
      if (!res.ok) throw new Error("Ошибка");
      setStatus("success");
      setName("");
      setSenderEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  return (
    <section id="contacts" style={{ padding: "128px 0" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#1d1d1f", margin: 0 }}>
            Контакты
          </h2>
          <p style={{ marginTop: "16px", fontSize: "1.125rem", color: "#6e6e73" }}>
            Свяжитесь со мной удобным способом
          </p>
        </div>

        <div style={{ marginTop: "64px", display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label === "Email" ? undefined : "_blank"}
                  rel={contact.label === "Email" ? undefined : "noopener noreferrer"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "24px", transition: "box-shadow 0.2s" }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6e6e73", margin: 0 }}>{contact.label}</p>
                        <p style={{ marginTop: "2px", fontSize: "1rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>{contact.value}</p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div style={{ borderRadius: "16px", border: "1px solid #d2d2d7", padding: "32px", transition: "box-shadow 0.2s" }}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", backgroundColor: "rgba(0,113,227,0.05)", color: "#0071e3", flexShrink: 0 }}>
                <MessagesSquare size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1d1d1f", margin: 0 }}>Написать мне</h3>
                <p style={{ fontSize: "0.875rem", color: "#6e6e73", margin: 0 }}>Заполните форму и я отвечу</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%", borderRadius: "12px", border: "1px solid #d2d2d7", backgroundColor: "white", padding: "12px 16px", fontSize: "0.875rem", color: "#1d1d1f", outline: "none" }}
              />
              <input
                type="email"
                placeholder="Ваш email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                style={{ width: "100%", borderRadius: "12px", border: "1px solid #d2d2d7", backgroundColor: "white", padding: "12px 16px", fontSize: "0.875rem", color: "#1d1d1f", outline: "none" }}
              />
              <textarea
                placeholder="Ваше сообщение *"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%", minHeight: "120px", borderRadius: "12px", border: "1px solid #d2d2d7", backgroundColor: "white", padding: "12px 16px", fontSize: "0.875rem", color: "#1d1d1f", outline: "none", resize: "vertical" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", alignSelf: "flex-start", borderRadius: "9999px", backgroundColor: "#0071e3", padding: "10px 24px", fontSize: "0.875rem", fontWeight: 500, color: "white", border: "none", cursor: "pointer", transition: "background-color 0.2s", opacity: status === "loading" ? 0.5 : 1 }}
              >
                {status === "loading" ? "Отправка..." : status === "success" ? "Отправлено ✓" : status === "error" ? "Ошибка" : "Отправить"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
