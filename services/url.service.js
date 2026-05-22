import { eq } from "drizzle-orm";

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

export const getUrlByShortCode = async (shortCode) => {
  const [result] = await db
    .select({
      targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  return result;
};

export const getAllShortUrlsByUserId = async (userId) => {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId));

  return codes;
};
