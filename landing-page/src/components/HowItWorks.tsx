import React from "react";
import { ShieldCheck, Zap, Send, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    label: "CAPTAR",
    title: "Captação automática",
    desc: "Receba novos leads automaticamente e centralize as informações necessárias para sua equipe.",
    icon: <ShieldCheck size={16} />,
    file: "webhook_payload.json",
    code: `{\n  "origem": "Landing Page",\n  "status": "Capturado",\n  "tempo": "0.1s"\n}`,
  },
  {
    num: "02",
    label: "QUALIFICAR",
    title: "Scoring inteligente",
    desc: "Use critérios como perfil, faturamento, interesse e urgência para identificar as melhores oportunidades.",
    icon: <Zap size={16} />,
    file: "scoring_decision.json",
    code: `{\n  "pontuacao": 90,\n  "trilha": "QUENTE",\n  "status": "Elegível"\n}`,
    highlight: true,
  },
  {
    num: "03",
    label: "CONVERTER",
    title: "WhatsApp personalizado",
    desc: "Direcione cada lead para uma abordagem adequada no WhatsApp e acelere o início da conversa comercial.",
    icon: <Send size={16} />,
    file: "dispatch_queue.json",
    code: `{\n  "status": 200,\n  "trilha": "Quente VIP",\n  "queue": "active"\n}`,
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "100px 0", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="container-site">
        <div style={{ maxWidth: 680, marginBottom: 60 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Como funciona a esteira</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", margin: 0, marginBottom: 16 }}>
            Uma esteira completa para transformar leads em{" "}
            <span style={{ color: "var(--text-tertiary)" }}>oportunidades de venda.</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
            Você vai entender como conectar captação, qualificação e WhatsApp em uma única operação automatizada no n8n.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="howitworks-grid">
          {steps.map((s, i) => (
            <div key={i} className={s.highlight ? "card-dark" : "card"} style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontFamily: "'Fragment Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: s.highlight ? "rgba(255,255,255,0.4)" : "var(--text-tertiary)",
                }}>
                  ETAPA {s.num}
                </span>
                <span style={{
                  fontFamily: "'Fragment Mono', monospace", fontSize: 10, letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: s.highlight ? "rgba(255,255,255,0.4)" : "var(--text-tertiary)",
                }}>
                  {s.label}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8, color: s.highlight ? "#fff" : "var(--text-primary)" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: s.highlight ? "rgba(255,255,255,0.55)" : "var(--text-secondary)", margin: 0 }}>
                  {s.desc}
                </p>
              </div>

              {/* Code block */}
              <div style={{
                background: s.highlight ? "rgba(255,255,255,0.06)" : "var(--bg-card)",
                borderRadius: 10,
                overflow: "hidden",
                border: s.highlight ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--border)",
              }}>
                <div style={{
                  padding: "6px 12px",
                  borderBottom: s.highlight ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                      <span key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: s.highlight ? 0.5 : 1 }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 9, color: s.highlight ? "rgba(255,255,255,0.3)" : "var(--text-tertiary)", marginLeft: 4 }}>
                    {s.file}
                  </span>
                </div>
                <pre style={{
                  margin: 0, padding: "12px 14px",
                  fontFamily: "'Fragment Mono', monospace",
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: s.highlight ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
                  whiteSpace: "pre",
                }}>
                  {s.code}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <a href="#inscricao" className="btn-rainbow">
            Quero participar da masterclass <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .howitworks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
