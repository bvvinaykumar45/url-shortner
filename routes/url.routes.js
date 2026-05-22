import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import {
  deleteShortUrlController,
  getAllShortUrlsController,
  redirectUrlController,
  shortenUrlController,
} from "../controllers/url.controller.js";

const router = Router();

router.post("/shorten", ensureAuthenticated, shortenUrlController);
router.get("/codes", ensureAuthenticated, getAllShortUrlsController);
router.delete("/:id", ensureAuthenticated, deleteShortUrlController);
router.get("/:shortCode", redirectUrlController);

export default router;
