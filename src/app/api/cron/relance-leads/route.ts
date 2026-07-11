import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notionSecret = process.env.NOTION_SECRET;
  const notionDbId = process.env.NOTION_DATABASE_ID;
  const resendKey = process.env.RESEND_API_KEY;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!notionSecret || !notionDbId || !resendKey) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const notion = new Client({ auth: notionSecret });
  const resend = new Resend(resendKey);

  // Query leads with status "Nouveau" created > 3 days ago
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await (notion as any).databases.query({
    database_id: notionDbId,
    filter: {
      and: [
        { property: "Statut", select: { equals: "Nouveau" } },
        {
          property: "Date",
          date: { before: threeDaysAgo.toISOString().split("T")[0] },
        },
      ],
    },
  });

  let relanced = 0;
  const errors: string[] = [];

  for (const page of response.results) {
    if (page.object !== "page") continue;
    const props = (page as { properties: Record<string, unknown> }).properties;

    const nom =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props.Nom as any)?.title?.[0]?.text?.content ?? "là";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const email = (props.Email as any)?.email;

    if (!email) continue;

    try {
      await resend.emails.send({
        from: "Ayoub Berkiks <contact@ayoubberkiks.fr>",
        to: email,
        subject: "Avez-vous eu le temps de réfléchir à votre projet ?",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0f0f0f">
            <h2 style="font-family:Georgia,serif;color:#1a3a5c">Bonjour ${nom},</h2>
            <p style="font-size:15px;line-height:1.7;margin-top:16px">
              Je voulais prendre de vos nouvelles suite à votre demande de contact il y a quelques jours.
            </p>
            <p style="font-size:15px;line-height:1.7">
              Avez-vous eu le temps d'avancer sur votre projet ? Je serais ravi d'échanger avec vous, même 30 minutes, pour voir si je peux vous aider.
            </p>
            ${
              calendlyUrl
                ? `<a href="${calendlyUrl}" style="display:inline-block;margin-top:16px;padding:12px 24px;background:#1a3a5c;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Réserver un appel gratuit</a>`
                : ""
            }
            <p style="font-size:14px;color:#6b7280;margin-top:32px">
              À bientôt,<br/>
              <strong>Ayoub Berkiks</strong>
            </p>
          </div>
        `,
      });

      // Update Notion status to "Relancé"
      await notion.pages.update({
        page_id: page.id,
        properties: {
          Statut: { select: { name: "Relancé" } },
        },
      });

      relanced++;
    } catch (err) {
      errors.push(`${email}: ${String(err)}`);
    }
  }

  return NextResponse.json({ relanced, errors });
}
