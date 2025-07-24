export default async function handler(req, res) {
  const targetUrl = 'https://member.digitavision.com/protect/new-rewrite?i=202&url=/tools/elevenlabs/ghost=member.digitavision.com&assi=on';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      },
    });

    let html = await response.text();

    // Clean unwanted parts (header/footer/logo/copyright/cookies/chat)
    html = html.replace(/<header[\s\S]*?<\/header>/gi, '');
    html = html.replace(/<footer[\s\S]*?<\/footer>/gi, '');
    html = html.replace(/<img[^>]*logo[^>]*>/gi, '');
    html = html.replace(/<div[^>]*?copyright[^>]*?>[\s\S]*?<\/div>/gi, '');
    html = html.replace(/<div[^>]*?cookie[^>]*?>[\s\S]*?<\/div>/gi, '');
    html = html.replace(/<div[^>]*?chat[^>]*?>[\s\S]*?<\/div>/gi, '');

    // Optional: remove specific phrases (as backup)
    html = html.replace(/Digitavision Limited 2017 - 2025[^<]+/gi, '');
    html = html.replace(/This site uses cookies[^<]+/gi, '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed', details: error.message });
  }
}
