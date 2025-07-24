export default async function handler(req, res) {
  const targetUrl = 'https://member.digitavision.com/protect/new-rewrite?i=202&url=/tools/elevenlabs/ghost=member.digitavision.com&assi=on';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      },
    });

    let html = await response.text();

    // Remove specific elements by known inner text and widgets
    html = html
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<img[^>]*logo[^>]*>/gi, '')
      .replace(/© Digitavision Limited 2017 - 2025 No #1 SEO Group Buy Service Provider Cheapest Price !/gi, '')
      .replace(/<div[^>]*?(intercom|chat|tawk|zopim|widget)[^>]*?>[\s\S]*?<\/div>/gi, '')
      .replace(/<script[\s\S]*?(intercom|chat|widget)[\s\S]*?<\/script>/gi, '')
      .replace(/<link[^>]*?(intercom|chat|widget)[^>]*?>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '') // remove any iframe
      .replace(/Accept<\/a>/gi, '')
      .replace(/This site uses cookies[^<]+/gi, '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
}
