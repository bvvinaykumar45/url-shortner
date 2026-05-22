import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { redirectUrlController, shortenUrlController } from "../controllers/url.controller.js";

const router = Router();

router.post("/shorten", ensureAuthenticated, shortenUrlController);
router.get("/:shortCode", redirectUrlController);

export default router;
