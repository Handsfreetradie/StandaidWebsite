import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "StandAId <hello@standaid.ai>";
const NOTIFY = "hello@standaid.ai";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
  if (!res.ok) throw new Error(await res.text());
}

serve(async (req) => {
  try {
    const payload = await req.json();
    const email: string = payload?.record?.email;

    if (!email) {
      return new Response(JSON.stringify({ error: "No email in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await Promise.all([
      // Welcome email to the new signup
      sendEmail(email, "You're on the StandAId waitlist", `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the waitlist</title>
</head>
<body style="margin:0;padding:0;background:#F7F5F2;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F2;padding:48px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border-radius:16px;border:1px solid rgba(0,0,0,0.06);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 32px;border-bottom:1px solid rgba(0,0,0,0.06);">
              <span style="font-size:22px;font-weight:700;color:#1D1D1F;letter-spacing:-0.02em;">
                Stand<span style="color:#DC2626;">AI</span>d
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 24px;font-size:24px;font-weight:600;color:#1D1D1F;letter-spacing:-0.02em;line-height:1.2;">
                You're on the list.
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#86868B;line-height:1.7;">
                Thanks for joining the StandAId waitlist. We're onboarding tradies, engineers and students in stages — you'll get an early access invite when your spot is ready.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#86868B;line-height:1.7;">
                While you wait, here's a reminder of what's coming:
              </p>

              <!-- Feature list -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 16px;background:#F7F5F2;border-radius:10px;margin-bottom:8px;">
                    <span style="font-size:14px;color:#1D1D1F;font-weight:500;">📄 Standards AI</span>
                    <span style="font-size:14px;color:#86868B;"> — Exact answers with clause references from your documents</span>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#F7F5F2;border-radius:10px;">
                    <span style="font-size:14px;color:#1D1D1F;font-weight:500;">🎓 Exam Helper</span>
                    <span style="font-size:14px;color:#86868B;"> — Mock exams and handwriting feedback built from your standards</span>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#F7F5F2;border-radius:10px;">
                    <span style="font-size:14px;color:#1D1D1F;font-weight:500;">🔧 Trade Tools</span>
                    <span style="font-size:14px;color:#86868B;"> — Volt drop, cable sizing, pipe fall, stair rise and more</span>
                  </td>
                </tr>
              </table>

              <p style="margin:32px 0 0;font-size:14px;color:#86868B;line-height:1.7;">
                We'll be in touch soon.<br/>
                — The StandAId Team
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(0,0,0,0.06);">
              <p style="margin:0;font-size:12px;color:#86868B;">
                You're receiving this because you signed up at standaid.ai.<br/>
                If this wasn't you, you can safely ignore this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim()),

      // Notification email to you
      sendEmail(NOTIFY, `New waitlist signup: ${email}`, `
        <div style="font-family:Arial,sans-serif;padding:32px;max-width:480px;">
          <h2 style="color:#1D1D1F;margin:0 0 16px;">New waitlist signup</h2>
          <p style="color:#86868B;margin:0 0 8px;">Someone just joined the StandAId waitlist.</p>
          <p style="font-size:18px;font-weight:600;color:#DC2626;margin:16px 0;">${email}</p>
        </div>
      `),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
