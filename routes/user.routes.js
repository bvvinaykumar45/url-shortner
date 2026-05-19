import { randomBytes, createHmac } from "node:crypto";
import { Router } from "express";
import { eq } from "drizzle-orm";
import db from "../db";
import { usersTable } from "../models";

const router = Router();

router.get("/singup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({
      id: usersTable.id,
    });

  return res.status(201).json({ data: { userId: user.id } });
});

export default router;
