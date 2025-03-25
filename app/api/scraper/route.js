//"use Client";
//the "backend" of News, which exports a simple div with the awaited data
import * as cheerio from "cheerio";
//import { useEffect, useState } from "react";
import { Cheerio } from "cheerio";

export async function GET(request) {
  //const url = new URL(request.url);
  const target = url.searchParams.get("target");

  if (!target) {
    return (
        <>
        </>
    );
  }

  try {
    //Ziel Url
    const url = "https://www.reddit.com/r/CryptoCurrency/";
    const { html } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    //HTML einlesen und parsen mit "cheerio"
    //parse HTML
   const $ = cheerio.load(html);
   let results = [];
     $("a[href*='/r/CryptoCurrency/comments/']").each((_, element) => {
      const title = $(element).text().trim();
      const link = "https://www.reddit.com" + $(element).attr("href");

      if (title && link) {
        results.push({ title, link });
      }
   console.log($);
  } catch (error) {
    console.error("ERR SCRAPING:", error);
  };
  res.status(200).json({ results });
  return new Response(title, link);
}
