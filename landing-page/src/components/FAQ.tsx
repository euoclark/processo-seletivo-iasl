"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "O webinário é gratuito?", a: "Sim, a transmissão ao vivo e os materiais complementares apresentados na aula são 100% gratuitos." },
  { q: "Preciso ter conhecimento prévio de programação?", a: "Não. A esteira é montada no n8n com interface visual e chamadas HTTP padrão, sem exigir código complexo." },
  { q: "Vou receber algum material após a aula?", a: "Sim. Quem participar da aula ao vivo receberá os materiais complementares disponibilizados pela equipe." },
  { q: "Como receberei o link de acesso?", a: "O link da transmissão será enviado para o WhatsApp e para o e-mail cadastrado no formulário." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "100px 0", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="container-site" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 48 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Tire suas dúvidas</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", margin: 0 }}>
            Perguntas frequentes
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", padding: "20px 0", display: "flex", alignItems: "center",
                  justifyContent: "space-between", gap: 16, cursor: "pointer", background: "none",
                  border: "none", textAlign: "left" as const,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)" }}>{faq.q}</span>
                <ChevronDown size={16} color="var(--text-tertiary)" style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
              </button>
              {open === i && (
                <p style={{ padding: "0 0 20px", fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
