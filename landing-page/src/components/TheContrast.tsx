import React from "react";
import { X, Check } from "lucide-react";

export default function TheContrast() {
  return (
    <section style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="container-site">
        <div style={{ maxWidth: 680, marginBottom: 60 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>A realidade comercial</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", margin: 0, marginBottom: 16 }}>
            Mais leads não significam mais vendas.{" "}
            <span style={{ color: "var(--text-tertiary)" }}>Leads certos, sim.</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
            Sua equipe comercial não deveria gastar o mesmo tempo com quem é apenas curioso e com quem já tem orçamento, urgência e estrutura para comprar.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="contrast-grid">
          {/* Old way */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--border)" }}>
              <div>
                <p style={{ fontSize: 10, fontFamily: "'Fragment Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-tertiary)", marginBottom: 6 }}>
                  Como a maioria opera
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>Atendimento manual</h3>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={14} color="#dc2626" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "15 a 40 min de espera para o primeiro contato com o lead.",
                "Vendedor sênior perdendo tempo com curioso sem orçamento.",
                "Mesma mensagem genérica enviada para qualquer perfil.",
                "Para aumentar o volume de atendimento, precisa inchar a equipe.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <X size={14} color="#dc2626" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* New way */}
          <div className="card-dark" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <p style={{ fontSize: 10, fontFamily: "'Fragment Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>
                  Como as operações eficientes rodam
                </p>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: "#fff" }}>Esteira no n8n</h3>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={14} color="#fff" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Primeiro contato enviado automaticamente em segundos.",
                "Lead Scoring identifica na hora quem tem orçamento e urgência.",
                "Abordagem sob medida e personalizada direto no WhatsApp.",
                "Sua equipe foca exclusivamente em fechar oportunidades qualificadas.",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Check size={14} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contrast-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
