import React from "react";

export default function Footer() {
  return (
    <footer style={{ padding: "32px 0", background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="container-site" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <img src="/logo.png" alt="IA Sem Limites" style={{ height: 16, opacity: 0.6 }} />
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
          © {new Date().getFullYear()} IA Sem Limites · Todos os direitos reservados · Em conformidade com a LGPD
        </p>
      </div>
    </footer>
  );
}
