// File: api/proxy.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = 'https://member.digitavision.com/protect/new-rewrite?i=202&url=/tools/elevenlabs/ghost=member.digitavision.com&assi=on';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || '',
      },
    });

    let html = await response.text();

    // উপরের লোগো, নিচের লেখা ইত্যাদি সরিয়ে ফেলা
    html = html.replace(/<header[\\s\\S]*?<\\/header>/gi, '');
    html = html.replace(/<footer[\\s\\S]*?<\\/footer>/gi, '');
    html = html.replace(/<img[^>]*logo[^>]*>/gi, '');
    html = html.replace(/<div[^>]*?copyright[^>]*?>[\\s\\S]*?<\\/div>/gi, '');

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch target content', details: error.message });
  }
}
