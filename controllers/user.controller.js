import { signupPostRequestBodySchema } from "../validations/request.validation.js";
import { getUserByEmail, createNewUser } from "../services/user.service.js";
import { hashPasswordWithSalt } from "../utils/hash.js";

export const userSignUpController = async (req, res) => {
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(req.body);

  if(validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
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
  }

  const newUser = await createNewUser(user);

  return res.status(201).json({ data: { userId: newUser.id } });
};