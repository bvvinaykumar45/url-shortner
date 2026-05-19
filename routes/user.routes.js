import { Router } from "express";

import { userSignUpController } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", userSignUpController);

export default router;
