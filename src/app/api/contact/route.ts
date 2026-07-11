import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";
import { Client } from "@notionhq/client";

// In-memory rate limit: IP → last submission timestamp
const rateLimit = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 request per minute per IP

const BUDGET_LABELS: Record<string, string> = {
  lt2k: "< 2 000 €",
  "2k5k": "2 000 - 5 000 €",
  "5k10k": "5 000 - 10 000 €",
  gt10k: "> 10 000 €",
  tbd: "À définir",
};

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const lastReq = rateLimit.get(ip);
  const now = Date.now();
  if (lastReq && now - lastReq < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans une minute." },
      { status: 429 }
    );
  }
  rateLimit.set(ip, now);

  // Parse & validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Données invalides.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // Honeypot check
  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true }); // silently discard spam
  }

  const { nom, email, entreprise, budget, typeProjet, description } = data;
  const budgetLabel = BUDGET_LABELS[budget] ?? budget;
  const typesLabel = typeProjet.join(", ");
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // 1. Send notification email (BLOCKING)
  const resend = new Resend(process.env.RESEND_API_KEY);
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    console.error("CONTACT_EMAIL not set");
    return NextResponse.json(
      { error: "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  await resend.emails.send({
    from: "Formulaire site <noreply@ayoubberkiks.fr>",
    to: contactEmail,
    replyTo: email,
    subject: `[Nouveau lead] ${nom}${entreprise ? ` — ${entreprise}` : ""}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f0f0f">
        <h2 style="font-family:Georgia,serif;color:#1a3a5c">Nouvelle demande de contact</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:130px">Nom</td><td style="padding:8px 0;font-size:14px;font-weight:600">${nom}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#1a3a5c">${email}</a></td></tr>
          ${entreprise ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Entreprise</td><td style="padding:8px 0;font-size:14px">${entreprise}</td></tr>` : ""}
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Budget</td><td style="padding:8px 0;font-size:14px">${budgetLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Type projet</td><td style="padding:8px 0;font-size:14px">${typesLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px">Date</td><td style="padding:8px 0;font-size:14px">${date}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#f5f5f4;border-radius:8px">
          <p style="font-size:13px;color:#6b7280;margin:0 0 8px 0;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Description</p>
          <p style="font-size:14px;margin:0;white-space:pre-wrap">${description}</p>
        </div>
      </div>
    `,
  });

  // 2. Send confirmation to prospect (non-blocking)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  resend.emails
    .send({
      from: "Ayoub Berkiks <contact@ayoubberkiks.fr>",
      to: email,
      subject: "Votre message a bien été reçu — Ayoub Berkiks",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f0f0f">
          <h2 style="font-family:Georgia,serif;color:#1a3a5c">Bonjour ${nom},</h2>
          <p style="font-size:15px;line-height:1.7;margin-top:16px">
            Merci pour votre message ! J'ai bien reçu votre demande et je reviens vers vous sous 48h ouvrées.
          </p>
          <p style="font-size:15px;line-height:1.7">
            En attendant, si vous souhaitez aller plus vite, vous pouvez directement réserver un appel découverte de 30 minutes :
          </p>
          ${
            calendlyUrl
              ? `<a href="${calendlyUrl}" style="display:inline-block;margin-top:8px;padding:12px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Réserver un appel</a>`
              : ""
          }
          <p style="font-size:14px;color:#6b7280;margin-top:32px">
            À très vite,<br/>
            <strong>Ayoub Berkiks</strong>
          </p>
        </div>
      `,
    })
    .catch((err) => console.error("Confirmation email failed:", err));

  // 3. Create Notion entry (non-blocking)
  const notionSecret = process.env.NOTION_SECRET;
  const notionDbId = process.env.NOTION_DATABASE_ID;
  let notionPageUrl: string | undefined;

  if (notionSecret && notionDbId) {
    const notion = new Client({ auth: notionSecret });
    notion.pages
      .create({
        parent: { database_id: notionDbId },
        properties: {
          Nom: { title: [{ text: { content: nom } }] },
          Email: { email },
          Entreprise: { rich_text: [{ text: { content: entreprise ?? "" } }] },
          Source: { select: { name: "Formulaire site" } },
          Date: { date: { start: new Date().toISOString().split("T")[0] } },
          Budget: { select: { name: budgetLabel } },
          "Type projet": { multi_select: typeProjet.map((t) => ({ name: t })) },
          Description: { rich_text: [{ text: { content: description } }] },
          Statut: { select: { name: "Nouveau" } },
        },
      })
      .then((page) => {
        notionPageUrl = `https://notion.so/${page.id.replace(/-/g, "")}`;
        // 4. Telegram notification (non-blocking)
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        if (botToken && chatId) {
          const msg = [
            "🆕 *Nouveau lead*",
            `👤 *${nom}*${entreprise ? ` — ${entreprise}` : ""}`,
            `📧 ${email}`,
            `💶 Budget : ${budgetLabel}`,
            `🏷 Types : ${typesLabel}`,
            notionPageUrl ? `🔗 [Voir dans Notion](${notionPageUrl})` : "",
          ]
            .filter(Boolean)
            .join("\n");

          fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: msg,
                parse_mode: "Markdown",
              }),
            }
          ).catch((err) => console.error("Telegram notification failed:", err));
        }
      })
      .catch((err) => console.error("Notion entry failed:", err));
  }

  return NextResponse.json({ ok: true });
}
