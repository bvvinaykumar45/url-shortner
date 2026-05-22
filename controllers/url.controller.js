import { z } from "zod";
import { nanoid } from "nanoid";

import { shortenPostRequestBodySchema } from "../validations/request.validation.js";
import { getUrlByShortCode, insertNewShortCode } from "../services/url.service.js";

export const shortenUrlController = async (req, res) => {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: z.flattenError(validationResult.error) });
  }

  const { url, code } = validationResult.data;
  const shortCode = code ?? nanoid(6);

  const urlRecord = {
    shortCode,
    targetURL: url,
    userId: req.user.id,
  };

  const result = await insertNewShortCode(urlRecord);

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
};

export const redirectUrlController = async (req, res) => {
  const code = req.params.shortCode;
  const result = await getUrlByShortCode(code);

  if(!result) {
    return res.status(404).json({ error: "Invalid URL." });
  }

  return res.redirect(result.targetURL);
}
