export default async function handler(req, res) {
  const targetUrl = 'https://member.digitavision.com/protect/new-rewrite?i=202&url=/tools/elevenlabs/ghost=member.digitavision.com&assi=on';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      },
    });

    let html = await response.text();

    // Remove headers, footers, logos, cookie bars, and chat icons
    html = html
      // Remove header/footer/logo
      .replace(/<header[\s\S]*?<\/header>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<img[^>]*logo[^>]*>/gi, '')
      // Remove copyright section
      .replace(/© Digitavision[^<]+/gi, '')
      .replace(/<div[^>]*?copyright[^>]*?>[\s\S]*?<\/div>/gi, '')
      // Remove cookie consent sections
      .replace(/<div[^>]*?cookie[^>]*?>[\s\S]*?<\/div>/gi, '')
      .replace(/This site uses cookies[^<]+<a[^>]*>Accept<\/a>/gi, '')
      .replace(/Accept<\/a>/gi, '')
      // Remove chat widget icons (JS or iframe-based)
      .replace(/<script[^>]*chat[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<iframe[^>]*chat[^>]*>[\s\S]*?<\/iframe>/gi, '')
      .replace(/<div[^>]*chat[^>]*?>[\s\S]*?<\/div>/gi, '')
      .replace(/<div[^>]*intercom[^>]*?>[\s\S]*?<\/div>/gi, '')
      .replace(/<script[\s\S]*?widget[\s\S]*?<\/script>/gi, '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
}
