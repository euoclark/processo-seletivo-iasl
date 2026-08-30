"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, Lock, Check } from "lucide-react";
import confetti from "canvas-confetti";
import CustomSelect from "./CustomSelect";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    nome: "", email: "", whatsapp: "",
    cargo: "", faturamento_mensal: "", principal_desafio: "",
    ja_usa_automacao: "", prazo_implementar: "", optin: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resultData, setResultData] = useState<any>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 11);
    let f = v;
    if (v.length > 2) f = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 7) f = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    setFormData({ ...formData, whatsapp: f });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const requiredSelects = ["cargo", "faturamento_mensal", "principal_desafio", "ja_usa_automacao", "prazo_implementar"];
    for (const field of requiredSelects) {
      if (!formData[field as keyof typeof formData]) {
        setErrorMsg("Preencha todos os campos antes de continuar.");
        return;
      }
    }
    if (!formData.optin) { setErrorMsg("Aceite os termos para continuar."); return; }
    if (formData.whatsapp.replace(/\D/g, "").length < 10) { setErrorMsg("Informe um WhatsApp válido."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar.");
      setResultData(data);
      setSubmitted(true);
      setTimeout(() => {
        const el = document.getElementById("inscricao");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
      try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); } catch {}
    } catch (err: any) {
      setErrorMsg(err.message || "Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const first = formData.nome.trim().split(" ")[0];
    return (
      <div id="inscricao" className="card" style={{ padding: "36px 28px", width: "100%", maxWidth: "100%", boxSizing: "border-box", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#131315", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Check size={20} color="#fff" />
        </div>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Inscrição confirmada</p>
        <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12, color: "var(--text-primary)" }}>
          Vaga garantida, {first}!
        </h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, maxWidth: 360 }}>
          Enviamos o link de acesso para o seu WhatsApp. Fique atento às mensagens da nossa equipe.
        </p>
      </div>
    );
  }

  const inputCls = "form-input";
  const labelCls = "form-label";

  return (
    <div id="inscricao" className="card" style={{ padding: "28px 28px 24px", width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <div style={{ marginBottom: 20 }}>
        <p className="eyebrow" style={{ marginBottom: 6 }}>Inscrição gratuita · Vagas limitadas</p>
        <h3 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>
          Reserve seu acesso à aula
        </h3>
      </div>

      {errorMsg && (
        <div style={{ marginBottom: 14, padding: "10px 14px", borderRadius: 10, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", fontSize: 13, color: "#dc2626" }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: "100%", minWidth: 0 }}>
        {/* Nome */}
        <div>
          <label className={labelCls}>Nome completo</label>
          <input type="text" required placeholder="Seu nome" value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
            className={inputCls} />
        </div>

        {/* Email & WhatsApp */}
        <div className="form-grid-2">
          <div>
            <label className={labelCls}>E-mail profissional</label>
            <input type="email" required placeholder="seu@empresa.com" value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>WhatsApp (com DDD)</label>
            <input type="tel" required placeholder="(11) 99999-9999" value={formData.whatsapp}
              onChange={handlePhoneChange} className={inputCls} />
          </div>
        </div>

        {/* Cargo & Faturamento */}
        <div className="form-grid-2">
          <CustomSelect label="Cargo ou papel" value={formData.cargo}
            onChange={v => setFormData({ ...formData, cargo: v })}
            placeholder="Selecione"
            options={["Sócio, CEO ou Diretor", "Gerente ou Coordenador", "Analista ou Consultor", "Outro"]} />
          <CustomSelect label="Faturamento mensal" value={formData.faturamento_mensal}
            onChange={v => setFormData({ ...formData, faturamento_mensal: v })}
            placeholder="Selecione"
            options={["Até R$ 10.000", "R$ 10.001 a R$ 50.000", "R$ 50.001 a R$ 100.000", "Acima de R$ 100.000"]} />
        </div>

        {/* Desafio */}
        <CustomSelect label="Qual seu maior gargalo hoje?" value={formData.principal_desafio}
          onChange={v => setFormData({ ...formData, principal_desafio: v })}
          placeholder="Selecione"
          options={[
            "Demora no atendimento no WhatsApp",
            "Leads desqualificados tomando tempo da equipe",
            "Falta de automação entre formulário, CRM e WhatsApp",
            "Dificuldade para fechar contratos de alto ticket",
            "Outro",
          ]} />

        {/* Automação & Prazo */}
        <div className="form-grid-2">
          <CustomSelect label="Já utiliza automação?" value={formData.ja_usa_automacao}
            onChange={v => setFormData({ ...formData, ja_usa_automacao: v })}
            placeholder="Selecione"
            options={["Não", "Sim, mas quero melhorar", "Sim, já tenho fluxos rodando"]} />
          <CustomSelect label="Prazo para implementar" value={formData.prazo_implementar}
            onChange={v => setFormData({ ...formData, prazo_implementar: v })}
            placeholder="Selecione"
            options={["Imediato (próximas semanas)", "Em até 3 meses", "Ainda sem previsão"]} />
        </div>

        {/* Opt-in */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
          <input type="checkbox" checked={formData.optin}
            onChange={e => setFormData({ ...formData, optin: e.target.checked })}
            style={{ marginTop: 2, accentColor: "#131315", width: 14, height: 14, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
            Concordo em receber as orientações da aula e conteúdos da IA Sem Limites via WhatsApp e e-mail.
          </span>
        </label>

        {/* Submit */}
        <button type="submit" disabled={loading} className="btn-rainbow"
          style={{ width: "100%", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? (
            <><Loader2 size={14} className="animate-spin" /> Processando...</>
          ) : (
            <>Quero participar gratuitamente <ArrowRight size={14} /></>
          )}
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 11, color: "var(--text-tertiary)" }}>
          <Lock size={11} /> Seguro e em conformidade com a LGPD
        </div>
      </form>
    </div>
  );
}
