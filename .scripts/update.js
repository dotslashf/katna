const { Client } = require("@notionhq/client");
const path = require("path");
const fs = require("fs/promises");

const databaseId = process.env.NOTION_DATABASE_ID;
const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function getUsedWords(cursor) {
  const db = await notion.databases.query({
    database_id: databaseId,
    start_cursor: cursor,
  });

  const words = db.results
    .filter((result) => {
      return result.properties.Katna.title.length > 0;
    })
    .map((result) => {
      return result.properties.Katna.title[0].plain_text;
    });

  if (db.has_more) {
    const nextWords = await getUsedWords(db.next_cursor);
    return words.concat(nextWords);
  }

  return words;
}

async function insertWord({ katna, kata }) {
  const now = getMidnightDate();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");

  await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Date: {
        type: "date",
        date: {
          start: `${year}-${month}-${date}`,
        },
      },
      Katna: {
        title: [
          {
            type: "text",
            text: {
              content: katna,
              link: null,
            },
            annotations: {},
            plain_text: katna,
            href: null,
          },
        ],
      },
      Arti: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: { content: kata },
          },
        ],
      },
    },
  });
}

// because this actions runs on UTC and previous date (23:58)
// we have to adjust few things
function getMidnightDate() {
  const now = new Date();
  now.setHours(now.getHours() + 7);
  const deltaToMidnightMinutes = 60 - now.getMinutes();
  now.setMinutes(now.getMinutes() + deltaToMidnightMinutes);
  return now;
}

async function main() {
  const [usedWords, allWords] = await Promise.all([
    getUsedWords(),
    fs
      .readFile(path.join(__dirname, "words.json"), "utf-8")
      .then((text) => JSON.parse(text)),
  ]);

  const validWords = allWords.filter((word) => !usedWords.includes(word.katna));

  // use let to allow secret words
  let word = validWords[Math.floor(Math.random() * validWords.length)];
  const secretDate = process.env.SECRET_DATE;
  const secretWord = process.env.SECRET_WORD;
  if (secretDate && secretWord) {
    const date = getMidnightDate();
    const [mm, dd] = secretDate.split("-").map(Number);
    if (date.getDate() == dd && date.getMonth() + 1 === mm) {
      word = secretWord;
    }
  }

  await insertWord(word);
  console.log("New word inserted", word);
}

main().catch((error) => {
  console.error("Failed", error);
  process.exit(1);
});
