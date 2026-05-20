import { z } from "zod";

export const userTokenPayloadSchema = z.object({
  id: z.uuidv4(),
})