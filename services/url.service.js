import db from "../db/index.js";
import { urlsTable } from "../models/index.js";

export const insertNewShortCode = async (urlRecord) => {
  const [newUrlRecord] = await db
    .insert(urlsTable)
    .values(urlRecord)
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return newUrlRecord;
};
