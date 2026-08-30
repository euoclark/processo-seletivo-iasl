import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Helper to calculate score based on test criteria
function calculateScoreAndTrack(data: {
  cargo?: string;
  faturamento_mensal?: string;
  prazo_implementar?: string;
  ja_usa_automacao?: string;
}) {
  let score = 0;

  // Faturamento mensal
  const fat = (data.faturamento_mensal || "").toLowerCase();
  if (fat.includes("acima de") || fat.includes("100.000") || fat.includes("100k") || fat.includes("200")) {
    score += 30;
  } else if (fat.includes("10.001") || fat.includes("50.000") || fat.includes("50k") || fat.includes("10k a 50k") || fat.includes("50.001 a 100.000")) {
    score += 15;
  } else {
    score += 0;
  }

  // Cargo ou papel
  const cargo = (data.cargo || "").toLowerCase();
  if (cargo.includes("sócio") || cargo.includes("socio") || cargo.includes("ceo") || cargo.includes("diretor") || cargo.includes("fundador") || cargo.includes("owner")) {
    score += 25;
  } else if (cargo.includes("gerente") || cargo.includes("coordenador") || cargo.includes("head") || cargo.includes("líder") || cargo.includes("lider")) {
    score += 15;
  } else if (cargo.includes("analista") || cargo.includes("especialista") || cargo.includes("consultor")) {
    score += 5;
  } else {
    score += 0;
  }

  // Prazo para implementar
  const prazo = (data.prazo_implementar || "").toLowerCase();
  if (prazo.includes("imediato") || prazo.includes("urgente") || prazo.includes("já") || prazo.includes("agora")) {
    score += 20;
  } else if (prazo.includes("3 meses") || prazo.includes("curto prazo") || prazo.includes("médio prazo")) {
    score += 10;
  } else {
    score += 0;
  }

  // Já usa automação
  const auto = (data.ja_usa_automacao || "").toLowerCase();
  if (auto.includes("sim") || auto.includes("quero melhorar") || auto.includes("melhorar")) {
    score += 15;
  } else if (auto.includes("não") || auto.includes("nao") || auto.includes("nunca")) {
    score += 10;
  }

  // Trilha
  let trilha = "Frio";
  if (score >= 60) {
    trilha = "Quente";
  } else if (score >= 30) {
    trilha = "Morno";
  } else {
    trilha = "Frio";
  }

  return { score, trilha };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nome,
      email,
      whatsapp,
      cargo,
      faturamento_mensal,
      principal_desafio,
      ja_usa_automacao,
      prazo_implementar,
      optin,
    } = body;

    // Validation
    if (!nome || !email || !whatsapp) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes (nome, email, whatsapp)." },
        { status: 400 }
      );
    }

    if (!optin) {
      return NextResponse.json(
        { error: "É necessário aceitar os termos de consentimento (opt-in)." },
        { status: 400 }
      );
    }

    // Lead scoring calculation
    const { score, trilha } = calculateScoreAndTrack({
      cargo,
      faturamento_mensal,
      prazo_implementar,
      ja_usa_automacao,
    });

    const leadRecord = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      created_at: new Date().toISOString(),
      nome: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      whatsapp: String(whatsapp).trim(),
      cargo: cargo || "Outro",
      faturamento_mensal: faturamento_mensal || "Até R$ 10.000",
      principal_desafio: principal_desafio || "Escalar captação e vendas",
      ja_usa_automacao: ja_usa_automacao || "Não",
      prazo_implementar: prazo_implementar || "Imediato",
      optin: Boolean(optin),
      pontuacao: score,
      trilha,
    };

    // Forward to external webhook (n8n live instance)
    const webhookUrl =
      process.env.WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_WEBHOOK_URL ||
      "https://clark-testeiasemlimites.app.n8n.cloud/webhook/landing-page";
    let webhookStatus = "not_configured";

    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadRecord),
        });
        webhookStatus = webhookRes.ok
          ? "sent_successfully"
          : `failed_with_status_${webhookRes.status}`;
      } catch (err) {
        console.error("Webhook forwarding error:", err);
        webhookStatus = "forwarding_error";
      }
    }

    // Local file persistence (for audit and backup)
    try {
      const dataDir = path.resolve(process.cwd(), "..", "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFilePath = path.join(dataDir, "leads_capturados_lp.json");
      let existingLeads: any[] = [];
      if (fs.existsSync(leadsFilePath)) {
        try {
          existingLeads = JSON.parse(fs.readFileSync(leadsFilePath, "utf-8"));
        } catch {
          existingLeads = [];
        }
      }
      existingLeads.push({ ...leadRecord, webhookStatus });
      fs.writeFileSync(leadsFilePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("Could not persist lead locally:", saveErr);
    }

    return NextResponse.json({
      success: true,
      message: "Inscrição confirmada com sucesso!",
      lead: leadRecord,
      webhookStatus,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Erro ao processar inscrição. Tente novamente." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Simple health/stats check
  try {
    const dataDir = path.resolve(process.cwd(), "..", "data");
    const leadsFilePath = path.join(dataDir, "leads_capturados_lp.json");
    if (fs.existsSync(leadsFilePath)) {
      const leads = JSON.parse(fs.readFileSync(leadsFilePath, "utf-8"));
      return NextResponse.json({
        status: "active",
        total_leads: leads.length,
        leads: leads.slice(-10), // return last 10 leads
      });
    }
  } catch {}
  return NextResponse.json({ status: "active", total_leads: 0, leads: [] });
}
