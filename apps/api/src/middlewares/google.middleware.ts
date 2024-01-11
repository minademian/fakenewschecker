import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { authenticate } from '@google-cloud/local-auth';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { google, Auth } from 'googleapis';

import { SCOPES, TOKEN_PATH, CREDENTIALS_PATH } from '../services/auth';

const fsp = fs.promises;

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fsp.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: any) {
  const content = await fsp.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fsp.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let jsonClient = await loadSavedCredentialsIfExist();
  if (jsonClient) {
    console.log('token already saved, no need to authorize');
    return jsonClient;
  }
  let oauthClient = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  let token = await oauthClient?.credentials;
  if (token) {
    await saveCredentials(oauthClient);
  }
  return oauthClient;
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export const googleAuth = async (
  req: TypedRequestBody<{ auth: any }>,
  res: Response,
  next: NextFunction
) => {
  console.log('Starting Google Auth now...');
  await authorize()
    .then((auth) => {
      req.body.auth = auth;
      console.log('success');
    })
    .catch(console.error);
  next();
};
