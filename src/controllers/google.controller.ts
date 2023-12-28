import { Request, Response } from 'express';
import { google } from 'googleapis';
import config from '../services/config';

export const AllRows = async (req: Request, res: Response) => {
  const auth = req.body.auth;
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.GoogleSpreadsheetId,
    range: 'Sheet1!A2:C',
  });
  const rows = response.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Name, Major:');
  rows.forEach((row) => {
    console.log(`${row[0]}, ${row[1]}, ${row[2]}`);
  });
  res.status(200).json([]);
};

export const OneRow = (_req: Request, res: Response) => {};
