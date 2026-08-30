import React from "react";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section style={{ padding: "100px 0", background: "var(--bg-dark)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container-site">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Fragment Mono', monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: 24 }}>
            Vagas limitadas para a aula ao vivo
          </p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#fff", margin: 0, marginBottom: 20 }}>
            Pronto para colocar sua captação e vendas no piloto automático?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "0 auto 12px", maxWidth: 520 }}>
            Cadastre-se gratuitamente para garantir seu acesso à masterclass ao vivo.
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: "0 auto 36px", maxWidth: 500 }}>
            Durante a aula, você vai acompanhar a construção da esteira e ver na prática como estruturar uma operação de vendas moderna com n8n.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="#inscricao" className="btn-rainbow" style={{ fontSize: 15, height: 52, padding: "0 32px" }}>
              Quero participar gratuitamente <ArrowRight size={15} />
            </a>
          </div>

          <p style={{ marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Fragment Mono', monospace" }}>
            📅 Quinta-feira, 03 de Setembro · 20h · Online e Gratuito
          </p>
        </div>
      </div>
    </section>
  );
}
