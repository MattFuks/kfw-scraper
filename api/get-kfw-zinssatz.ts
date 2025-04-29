import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/F%C3%B6rderprodukte/Klimafreundlicher-Neubau-Wohngeb%C3%A4ude-(297-298)/');
    const html = await response.text();
    const $ = cheerio.load(html);

    // Selektor prüfen und ggf. anpassen
    const zinssatz = $('.kfw-interest-rate').first().text().trim() || 'Kein Zinssatz gefunden';

    res.status(200).json({
      zinssatz,
      datum: new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
