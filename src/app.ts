import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import crypto, { BinaryLike } from 'crypto';

import config from './services/config';
import GraphApi from './services/graph-api';

const app = express();

app.use(json({ verify: verifyRequestSignature }));

function verifyRequestSignature(req: Request, _res: Response, buf: Buffer) {
  var signature = req.headers['x-hub-signature'];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature" in headers.`);
  } else {
    var elements = (signature as string).split('=');
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac('sha1', config.appSecret as BinaryLike)
      .update(buf)
      .digest('hex');
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ alive: true });
});

app.get('/profile', (req: Request, res: Response) => {
  let token = req.query['verify_token'];
  let mode = req.query['mode'];
  let url = config.webhookUrl;

  if (url && url.startsWith('http://'))
    // change back to https when going live
    res.status(200).send('ERROR - need a proper API_URL configured.');

  var Profile = require('./services/profile.js');
  Profile = new Profile();

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    if (token === config.verifyToken) {
      if (mode == 'webhook' || mode == 'all') {
        Profile.setWebhook();
        res.write(
          `<p>&#9989; Set app ${config.appId} call to ${config.webhookUrl}</p>`
        );
      }
      if (mode == 'profile' || mode == 'all') {
        Profile.setThread();
        res.write(
          `<p>&#9989; Set Messenger Profile of Page ${config.pageId}</p>`
        );
      }
      if (mode == 'nlp' || mode == 'all') {
        GraphApi.callNLPConfigsAPI();
        res.write(
          `<p>&#9989; Enabled Built-in NLP for Page ${config.pageId}</p>`
        );
      }
      if (mode == 'domains' || mode == 'all') {
        Profile.setWhitelistedDomains();
        res.write(
          `<p>&#9989; Whitelisted domains: ${config.whitelistedDomains}</p>`
        );
      }
      if (mode == 'private-reply') {
        Profile.setPageFeedWebhook();
        res.write(`<p>&#9989; Set Page Feed Webhook for Private Replies.</p>`);
      }
      res.status(200).end();
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  } else {
    // Returns a '404 Not Found' if mode or token are missing
    res.sendStatus(404);
  }
});

export default app;
