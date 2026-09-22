// Shop products from the Fourthwall Storefront API.
// The token stays here, in the Vercel environment (FOURTHWALL_TOKEN), never in the
// browser. Vercel's edge keeps the answer for 5 minutes, so Fourthwall is asked
// at most a few times an hour however many people open /shop.

const API = 'https://storefront-api.fourthwall.com/v1/collections/all/products';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.FOURTHWALL_TOKEN;
  if (!token) return res.status(500).json({ error: 'Shop not configured' });

  try {
    const r = await fetch(`${API}?storefront_token=${encodeURIComponent(token)}&currency=EUR&size=50`);
    if (!r.ok) {
      console.error('Fourthwall error', r.status);
      return res.status(502).json({ error: 'Shop unavailable' });
    }
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ results: data.results ?? [] });
  } catch (err) {
    console.error('Fourthwall request failed', err);
    return res.status(502).json({ error: 'Shop unavailable' });
  }
}
