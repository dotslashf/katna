import { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import { withSentry } from "@sentry/nextjs";
import fs from "fs/promises";
import path from "path";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const word = req.query.word as string;

  const allWords = JSON.parse(
    await fs.readFile(
      path.join(__dirname, "../../../../../.scripts/words.json"),
      "utf-8"
    )
  ) as [{ katna: string; kata: string }];

  const arti = allWords.find((words) => words.katna.toLowerCase() === word);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=21600, stale-while-revalidate=86400"
  );
  res.status(200).json(arti);
}

export default withSentry(handler);
