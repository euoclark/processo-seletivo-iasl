import React from "react";

export default function Mentors() {
  const mentors = [
    {
      name: "Bruno Gabarra",
      role: "Fundador da IA Sem Limites",
      tag: "Estratégia, IA e negócios",
      bio: "Criador do método que já capacitou mais de 90.000 alunos. Ensina como construir um negócio real e escalável com inteligência artificial.",
      image: "/images/professores/bruno-gabarra.png",
    },
    {
      name: "Igor Miguel",
      role: "Especialista em n8n",
      tag: "Automação e n8n",
      bio: "Referência em automação com n8n. Ensina do básico ao avançado como construir agentes e fluxos que geram resultado.",
      image: "/images/professores/igor-miguel.png",
    },
    {
      name: "Cadu Costa",
      role: "Especialista em Vendas e Liderança",
      tag: "Vendas e escala comercial",
      bio: "Especialista em construir estratégias de venda de alto valor para agências de IA. Responsável pelo módulo de crescimento e escala.",
      image: "/images/professores/cadu-costa.png",
    },
  ];

  return (
    <section style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div className="container-site">
        <div style={{ maxWidth: 680, marginBottom: 60 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Quem vai mostrar isso na prática</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--text-primary)", margin: 0, marginBottom: 16 }}>
            Experiência de estratégia, automação e vendas em uma única aula.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>
            Não ensinamos teoria. Cada professor é um profissional ativo com resultados reais e método testado.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="mentors-grid">
          {mentors.map((m, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", background: "var(--bg-card)", overflow: "hidden" }}>
                <img src={m.image} alt={m.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
              </div>
              <div style={{ padding: 24 }}>
                <p style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "var(--text-tertiary)", marginBottom: 8 }}>
                  {m.tag}
                </p>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 4, color: "var(--text-primary)" }}>{m.name}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12 }}>{m.role}</p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0 }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mentors-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
