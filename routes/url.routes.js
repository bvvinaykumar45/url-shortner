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

router.get("/codes", ensureAuthenticated, getAllShortUrlsController);
router.post("/shorten", ensureAuthenticated, shortenUrlController);

router.get("/:shortCode", redirectUrlController);
router.patch("/:id", ensureAuthenticated, updateUrlController);
router.delete("/:id", ensureAuthenticated, deleteShortUrlController);

export default router;
