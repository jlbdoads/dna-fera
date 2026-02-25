import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name, answers } = await request.json();

    const userName = name || "Novo";

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    // Gerar resultado básico baseado nas respostas
    const styleType = generateStyleType(answers);
    const colors = generateColors(answers);

    const data = await resend.emails.send({
      from: "DNA FERA <onboarding@resend.dev>",
      to: email,
      subject: "🎉 Seu resultado do DNA FERA está pronto!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .result-box { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .color-palette { display: flex; gap: 10px; margin: 15px 0; }
            .color { width: 50px; height: 50px; border-radius: 50%; }
            .cta { display: inline-block; background: #0ea5e9; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">DNA FERA</h1>
              <p style="margin: 10px 0 0 0;">Seu guia de estilo personalizado</p>
            </div>
            <div class="content">
              <h2>Olá, ${userName}! 👋</h2>
              <p>Seu resultado do quiz está pronto!</p>
              
              <div class="result-box">
                <h3 style="margin-top: 0;">Seu Estilo: ${styleType}</h3>
                
                <p><strong>Sua paleta de cores:</strong></p>
                <div class="color-palette">
                  ${colors.map((c: string) => `<div class="color" style="background: ${c};"></div>`).join('')}
                </div>
                
                <p><strong>Recomendamos:</strong></p>
                <ul>
                  ${generateRecommendations(answers, styleType)}
                </ul>
              </div>
              
              <p>Em breve você receberá mais dicas personalizadas!</p>
              
              <center>
                <a href="#" class="cta">Ver resultado completo</a>
              </center>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}

function generateStyleType(answers: Record<string, string | string[]>): string {
  const styles = answers["3"] as string[] || [];
  
  if (styles.includes("casual") && styles.includes("minimalista")) {
    return "Casual Minimalista";
  } else if (styles.includes("classico")) {
    return "Clássico Elegante";
  } else if (styles.includes("street_style")) {
    return "Street Style";
  } else if (styles.includes("sporty_chic")) {
    return "Sporty Chic";
  } else if (styles.includes("boho")) {
    return "Boho Chic";
  } else if (styles.includes("preppy")) {
    return "Preppy";
  }
  
  return "Casual Moderno";
}

function generateColors(answers: Record<string, string | string[]>): string[] {
  const budget = answers["8"] as string;
  
  if (budget === "luxo" || budget === "premium") {
    return ["#1a1a1a", "#ffffff", "#c9a227", "#2c3e50"];
  } else if (budget === "fast_fashion") {
    return ["#000000", "#ffffff", "#808080", "#4a90d9"];
  }
  
  return ["#2c3e50", "#34495e", "#7f8c8d", "#ecf0f1"];
}

function generateRecommendations(answers: Record<string, string | string[]>, styleType: string): string {
  const recommendations = [
    "Invista em peças básicas de qualidade",
    "Misture cores neutras com um ponto de cor",
    "Aposte em acessórios para dar personalidade",
    "Mantenha um guarda-roupa mínimo e versatile"
  ];
  
  return recommendations.map(r => `<li>${r}</li>`).join('');
}
