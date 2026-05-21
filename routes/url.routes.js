import { Router } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { shortenPostRequestBodySchema } from "../validations/request.validation.js";
import db from "../db/index.js";
import { urlsTable } from "../models/index.js";

const router = Router();

router.post("/shorten", async (req, res) => {
  const userId = req.user?.id;

  if (!userId)
    return res
      .status(401)
      .json({ error: "You must be logged in to access this resource." });

  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: z.flattenError(validationResult.error) });
  }

  const { url, code } = validationResult.data;
  const shortCode = code ?? nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

export default router;
