import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allWords = JSON.parse(
    await fs.readFile(
      path.join(__dirname, "../../../../public/words.json"),
      "utf-8"
    )
  ) as [{ katna: string; kata: string }];

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  res.status(200).json(allWords);
}
