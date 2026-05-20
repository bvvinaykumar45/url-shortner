import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";

export async function getUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
}

export async function createNewUser(user) {
  const [newUser] = await db
    .insert(usersTable)
    .values(user)
    .returning({ id: usersTable.id });

  return newUser;
}
