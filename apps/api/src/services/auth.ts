import path from 'path';
import process from 'process';
import { google } from 'googleapis';

import config from './config';

export const TOKEN_PATH = path.join(process.cwd(), 'token.json');
export const CREDENTIALS_PATH = path.join(process.cwd(), 'client.json');

export const SCOPES = [`${config.GoogleApiUrl}/spreadsheets.readonly`];

const oauth2Client = new google.auth.OAuth2(
  config.GoogleClientId,
  config.GoogleClientSecret,
  config.redirectUri
);

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  include_granted_scopes: true,
});
