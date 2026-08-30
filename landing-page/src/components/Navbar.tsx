import React from "react";

export default function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(19,19,21,0.08)",
      }}
    >
      <div className="container-site" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logo.png" alt="IA Sem Limites" style={{ height: 18, width: "auto", objectFit: "contain" }} />
        </a>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="nav-date-badge">
            03 de Setembro • 20h
          </span>
          <a href="#inscricao" className="btn-rainbow" style={{ height: 38, padding: "0 18px", fontSize: 13 }}>
            Garantir vaga
          </a>
        </div>
      </div>
    </header>
  );
}
