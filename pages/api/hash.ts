import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

import { encode } from "../../utils/codec";

const databaseId = process.env.NOTION_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const entry = db.results[0] as any;
  const date = entry.properties.Date.date.start;
  const katna = entry.properties.Katna.title[0].plain_text.toLowerCase();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=3600"
  );
  res.status(200).json({ hash: encode(katna), date: date });
}
