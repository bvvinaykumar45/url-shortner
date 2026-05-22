import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import {
  deleteShortUrlController,
  getAllShortUrlsController,
  redirectUrlController,
  shortenUrlController,
  updateUrlController,
} from "../controllers/url.controller.js";

const router = Router();

router.get("/urls", ensureAuthenticated, getAllShortUrlsController);
router.patch("/urls/:id", ensureAuthenticated, updateUrlController);
router.delete("/urls/:id", ensureAuthenticated, deleteShortUrlController);

router.post("/shorten", ensureAuthenticated, shortenUrlController);

router.get("/:shortCode", redirectUrlController);

export default router;
