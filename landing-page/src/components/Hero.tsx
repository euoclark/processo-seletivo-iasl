"use client";

import React from "react";
import LeadForm from "./LeadForm";
import { Check } from "lucide-react";

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: 120,
        paddingBottom: 80,
        background: "#fafafa",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(150,100,255,0.04) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(0,200,255,0.04) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative" }}>
        <div className="hero-grid">
          {/* Left: Copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Eyebrow */}
            <div className="eyebrow">
              Masterclass ao vivo e gratuita · 03 de Setembro, 20h
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                margin: 0,
                background: "linear-gradient(180deg, #131315 0%, rgba(19, 19, 21, 0.55) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Como automatizar sua captação e vendas no WhatsApp com n8n.
            </h1>

            {/* Subheadline */}
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-secondary)", margin: 0, maxWidth: 490 }}>
              Aprenda a construir uma esteira que captura, qualifica e direciona seus leads automaticamente, para sua equipe focar nas oportunidades que realmente podem virar vendas.
            </p>

            {/* 3 Bullets */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Captação automática conectada aos seus canais de aquisição",
                "Lead Scoring inteligente para priorizar quem tem real poder de compra",
                "Roteamento de mensagens no WhatsApp sem depender de triagem manual",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "var(--bg-dark)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div
              style={{
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>+90.000 alunos</strong> formados na IA Sem Limites
              </span>
              <div style={{ width: 1, height: 14, background: "var(--border-mid)" }} />
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>★★★★★ 4.9/5</span>
            </div>

          </div>

          {/* Right: Form */}
          <div>
            <LeadForm />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
