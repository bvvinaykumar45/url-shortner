import jwt from "jsonwebtoken";
import z from "zod";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validations/request.validation.js";
import { getUserByEmail, createNewUser } from "../services/user.service.js";
import { hashPasswordWithSalt } from "../utils/hash.js";

export const userSignUpController = async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body,);

  if (validationResult.error) {
    return res.status(400).json({ error: z.treeifyError(validationResult.error) });
  }

  const { firstName, lastName, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` });
  }

  const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

  const user = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    salt,
  };

  const newUser = await createNewUser(user);

  return res.status(201).json({ data: { userId: newUser.id } });
};

export const userLoginController = async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error:  z.flattenError(validationResult.error) });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ error: `User with email ${email} does not exists!` });
  }

  const { password: hashedPassword } = hashPasswordWithSalt(
    password,
    user.salt,
  );

  if (user.password !== hashedPassword) {
    return res.status(400).json({ error: `Invalid Password` });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  return res.status(200).json({ token });
};
