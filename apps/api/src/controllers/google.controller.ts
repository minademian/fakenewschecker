import { Request, Response } from 'express';
import { google } from 'googleapis';
import config from '../services/config';

type ResultProp = string | undefined;

type SpreadsheetResult = Array<{
  url: ResultProp;
  type1: ResultProp;
  type2: ResultProp;
}>;

export const AllRows = async (req: Request, res: Response) => {
  const auth = req.body.auth;

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.GoogleSpreadsheetId,
    range: config.GoogleSpreadsheetRange,
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    res.status(200).json([]);
    return;
  }

  const result: SpreadsheetResult = rows.map((row) => {
    return {
      url: row[0],
      type1: row[1],
      type2: row[2],
    };
  });

  res.status(200).json(result);
};

export const OneRow = (_req: Request, res: Response) => {};
