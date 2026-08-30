import React from "react";
import { ArrowRight } from "lucide-react";

export default function WhatYouGet() {
  const items = [
    {
      num: "01",
      title: "A esteira completa no n8n",
      desc: "Veja como conectar captação, tratamento de dados, qualificação e WhatsApp em um único fluxo funcional.",
    },
    {
      num: "02",
      title: "Sistema de Lead Scoring",
      desc: "Aprenda a criar regras de pontuação baseadas em faturamento, cargo e urgência para priorizar oportunidades.",
    },
    {
      num: "03",
      title: "Segmentação no WhatsApp",
      desc: "Entenda como estruturar abordagens diferentes para leads com diferentes níveis de interesse e potencial.",
    },
    {
      num: "04",
      title: "Operação Comercial de Alto Valor",
      desc: "Descubra como estruturar uma operação enxuta e automatizada para apoiar vendas e contratos de alto valor.",
    },
  ];

  return (
    <section style={{ padding: "100px 0", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="container-site">
        <div style={{ maxWidth: 680, marginBottom: 60 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Conteúdo prático da aula</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", margin: 0, marginBottom: 16 }}>
            O que você vai dominar na masterclass.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
            Uma visão completa de arquitetura, automação e processos comerciais para aplicar na sua operação e parar de perder vendas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="whatyouget-grid">
          {items.map((item, i) => (
            <div key={i} className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-tertiary)", margin: 0 }}>
                {item.num}
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
                {item.desc}
              </p>
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
          .whatyouget-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
