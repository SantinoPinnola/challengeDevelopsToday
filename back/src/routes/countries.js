import { Router } from "express";
import {
  getAvailableCountries,
  getCountryInfo,
} from "../controllers/countryController.js";

const router = Router();

router.get("/available", getAvailableCountries);
router.get("/:code", getCountryInfo);

export default router;
