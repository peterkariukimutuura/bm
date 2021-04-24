import { Request, Response } from "express";
import { cleanValidationErrors, scrapInformation, validationErrorMessages } from "../utils";
import path from "path";
import { validationResult } from "express-validator";

const CountryCode = "Country Code";

interface Newtwork {
  MCC: string;
  MNC: string;
  ISO: string;
  Country: string;
  [CountryCode]: string;
  Network: string;
}

const MobileData: Newtwork[] = require("../../data/json-data.json");

export const generateMobileData = (req: Request, res: Response) => {
  try {
    const filename: string =
      path.join(__dirname, "/../../data/") + "json-data.json";

    scrapInformation(filename);

    res.status(200).json({
      message: "Data generated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error ocurred , try again later",
      error: error.message,
    });
  }
};

export const fetchData = (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "success",
      data: MobileData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error ocurred , try again later",
      error: error.message,
    });
  }
};

export const NetworkNameAndCountry = (req: Request, res: Response) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: validationErrorMessages(errors),
        error: cleanValidationErrors(errors),
      });
    }

    const MCC: string = req.body?.MCC;
    const MNC: string = req.body?.MNC;

    const data = MobileData.filter(
      (item:Newtwork) => item?.MCC == MCC && item?.MNC == MNC
    ).map(({ Country, Network }:Newtwork) => ({ Country, Network }));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error ocurred , try again later",
      error: error.message,
    });
  }
};

export const AllNetworksInaSpecificCountry = (req: Request, res: Response) => {
  try {
    const MCC: string = req.body?.MCC;
    const Country: string = req.body?.Country;

    const data = MobileData.filter(
      (item:Newtwork) => item?.MCC == MCC || item?.Country == Country
    ).map(({ Country, Network }) => ({ Country, Network }));

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error ocurred , try again later",
      error: error.message,
    });
  }
};
