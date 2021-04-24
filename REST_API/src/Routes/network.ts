import { Router } from "express";
import { check } from "express-validator";
import {
  AllNetworksInaSpecificCountry,
  fetchData,
  NetworkNameAndCountry,
  generateMobileData,
} from "../controllers/Mobile.Controller";

const router = Router();

router.get("/scrap-data", generateMobileData);
router.get("/fetch-data", fetchData);
router.post(
  "/lookup-network-name-country",
  check("MCC").not().isEmpty().trim().escape().withMessage("MCC is required."),
  check("MNC").not().isEmpty().trim().escape().withMessage("MNC is  required."),
  NetworkNameAndCountry
);
router.post(
  "/lookup-all-networks-in-a-specific-country",
  AllNetworksInaSpecificCountry
);

export default router;
