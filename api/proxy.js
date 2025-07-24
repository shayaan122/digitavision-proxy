export default async function handler(req, res) {
  const targetUrl = 'https://member.digitavision.com/protect/new-rewrite?i=202&url=/tools/elevenlabs/ghost=member.digitavision.com&assi=on';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      },
    });

    let html = await response.text();

    // Custom CSS to hide copyright, chat, cookies, logos
    const customCSS = `
      <style>
        footer, header,
        [class*="chat"],
        [id*="chat"],
        [class*="cookie"],
        [id*="cookie"],
        [class*="intercom"],
        [id*="intercom"],
        div[style*="position: fixed"],
        div:has(> a[href*="Accept"]),
        div:has(> small),
        div:has(> span:contains('Digitavision')),
        img[src*="logo"] {
          display: none !important;
        }
      </style>
    `;

    // Inject the custom CSS into <head>
    html = html.replace(/<\/head>/i, `${customCSS}</head>`);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
}
