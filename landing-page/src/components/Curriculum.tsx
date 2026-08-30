import React from "react";
import { Layers, Target, Send, DollarSign, CheckCircle2 } from "lucide-react";

export default function Curriculum() {
  const modules = [
    {
      step: "01",
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      title: "Construção da esteira no n8n",
      desc: "Como receber os dados da landing page via webhook, normalizar telefones, tratar campos vazios e estruturar uma esteira que nunca quebra.",
      badge: "Infraestrutura",
    },
    {
      step: "02",
      icon: <Target className="w-5 h-5 text-emerald-400" />,
      title: "Lead scoring em tempo real",
      desc: "A lógica matemática para pontuar faturamento, cargo e urgência no segundo do cadastro, separando automaticamente os leads quentes dos curiosos.",
      badge: "Qualificação",
    },
    {
      step: "03",
      icon: <Send className="w-5 h-5 text-emerald-400" />,
      title: "Disparo segmentado via WhatsApp",
      desc: "Como conectar a Evolution API de forma segura e rotear copies persuasivas personalizadas para leads quentes, mornos e frios.",
      badge: "Conversão",
    },
    {
      step: "04",
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      title: "Venda de projetos de R$ 5k a R$ 15k",
      desc: "O modelo comercial de apresentação, precificação e contrato para vender essa implementação pronta para empresários e consultorias.",
      badge: "Monetização",
    },
  ];

  return (
    <section className="py-24 border-t border-white/[0.06] relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-3">
            O que você vai dominar
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Construção prática da esteira na tela
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
            Nada de apresentações teóricas. Você vai ver o fluxo rodando no n8n, disparando no WhatsApp e pronto para ser copiado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {mod.icon}
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md">
                    {mod.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {mod.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {mod.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400/90 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Inclui template exportável em JSON</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
