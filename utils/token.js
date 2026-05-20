import jwt from "jsonwebtoken";
import { userTokenPayloadSchema } from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function createUserToken(payload) {
  const validationResult = await userTokenPayloadSchema.safeParseAsync(payload);

  if (validationResult.error) throw new Error(validationResult.error.message);

  const validatedPayload = validationResult.data;

  const token = jwt.sign(validatedPayload, JWT_SECRET);
  return token;
}

export function validateUserToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}
