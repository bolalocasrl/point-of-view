// Newsletter signup: adds the address to the "POV WEBSITE" list in Brevo.
// The API key lives only here, in the Vercel environment — never in the browser.

const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID || 3); // POV WEBSITE
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(500).json({ error: 'Newsletter not configured' });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  // honeypot: real visitors leave this empty
  if (body.website) return res.status(200).json({ ok: true });

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: { SOURCE: 'website' },
      }),
    });

    if (r.ok || r.status === 204) return res.status(200).json({ ok: true });

    const data = await r.json().catch(() => ({}));
    // already subscribed is a success as far as the visitor is concerned
    if (data.code === 'duplicate_parameter') return res.status(200).json({ ok: true });

    console.error('Brevo error', r.status, data);
    return res.status(502).json({ error: 'Subscription failed' });
  } catch (err) {
    console.error('Brevo request failed', err);
    return res.status(502).json({ error: 'Subscription failed' });
  }
}

function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
