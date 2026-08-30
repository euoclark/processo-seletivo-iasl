import React from "react";
import { AlertTriangle, Clock, Users, XCircle, ArrowRight } from "lucide-react";

export default function TheProblem() {
  const pains = [
    {
      num: "01",
      title: "Seu time comercial perde horas com quem nunca vai comprar",
      desc: "Vendedores sênior atendendo curiosos sem orçamento enquanto leads com faturamento de R$ 100k+ ficam esperando na fila e esfriam.",
    },
    {
      num: "02",
      title: "Demora no primeiro contato destrói sua conversão",
      desc: "No WhatsApp, cada minuto de espera reduz drasticamente a chance de fechamento. Se você demora 15 minutos, o cliente já chamou outro.",
    },
    {
      num: "03",
      title: "Mensagens genéricas que não geram autoridade",
      desc: "Disparar a mesma copy padronizada para um CEO e para um estagiário queima a imagem da sua consultoria e zera a taxa de resposta.",
    },
    {
      num: "04",
      title: "Operação travada: para dobrar de vendas você precisa dobrar o time",
      desc: "Escalar no braço infla sua folha de pagamento, traz erros humanos e transforma crescimento em dor de cabeça ao invés de lucro.",
    },
  ];

  return (
    <section className="py-24 border-t border-white/[0.06] bg-[#06070a] relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Provocative Stance */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full inline-block">
              O gargalo real
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              O modelo tradicional de atendimento no WhatsApp está <span className="text-red-400">queimando o seu lucro</span>.
            </h2>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              A maioria das empresas gasta milhares de reais em tráfego para atrair leads, mas entrega o contato para uma equipe sobrecarregada responder manualmente. O resultado? Vendas perdidas e margem reduzida.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-gray-300 leading-relaxed font-mono">
              💡 <strong>A virada de jogo:</strong> Quem fatura alto com consultoria e serviços de R$ 5k a R$ 15k não atende no braço. Usa esteiras que qualificam em 1 segundo e entregam o lead quente pronto para assinar.
            </div>

            <div>
              <a
                href="#inscricao"
                className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
              >
                <span>Quero destravar minha esteira</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Pain Points Grid */}
          <div className="lg:col-span-7 space-y-4">
            {pains.map((p, idx) => (
              <div
                key={idx}
                className="glass-panel-luxury rounded-xl p-5 flex items-start gap-4 hover:border-red-500/30 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-red-400/80 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 flex-shrink-0 mt-0.5">
                  {p.num}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
