import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/shorten", ensureAuthenticated, );

export default router;
