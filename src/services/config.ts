/**
 * Source: https://github.com/fbsamples/original-coast-clothing/blob/main/services/config.js
 */
import dotenv from 'dotenv';

dotenv.config();

const ENV_VARS = [
  'PAGE_ID',
  'APP_ID',
  'PAGE_ACCESS_TOKEN',
  'APP_SECRET',
  'VERIFY_TOKEN',
  'APP_URL',
  'SHOP_URL',
];

type EnvVar = string | undefined;
type Port = string | number | undefined;

type Config = {
  apiDomain: EnvVar;
  apiVersion: EnvVar;
  pageId: EnvVar;
  appId: EnvVar;
  pageAccessToken: EnvVar;
  appSecret: EnvVar;
  verifyToken: EnvVar;
  appUrl: EnvVar;
  pageUrl: EnvVar;
  port: Port;
  apiUrl: EnvVar;
  webhookUrl: EnvVar;
  whitelistedDomains: EnvVar[];
  checkEnvVariables: Function;
};

const config: Config = {
  apiDomain: 'https://graph.facebook.com',
  apiVersion: 'v11.0',
  pageId: process.env.PAGE_ID,
  appId: process.env.APP_ID,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET,
  verifyToken: process.env.VERIFY_TOKEN,
  appUrl: process.env.APP_URL,
  pageUrl: process.env.PAGE_URL,
  port: process.env.PORT || 3000,

  get apiUrl() {
    return `${this.apiDomain}/${this.apiVersion}`;
  },

  get webhookUrl() {
    return `${this.appUrl}/webhook`;
  },
  get whitelistedDomains() {
    return [this.appUrl, this.pageUrl];
  },

  checkEnvVariables: function () {
    ENV_VARS.forEach(function (key) {
      if (!process.env[key]) {
        console.warn('WARNING: Missing the environment variable ' + key);
      } else {
        if (['APP_URL', 'SHOP_URL'].includes(key)) {
          const url: string = process.env[key] as string;
          if (!url.startsWith('https://')) {
            console.warn(
              'WARNING: Your ' + key + ' does not begin with "https://"'
            );
          }
        }
      }
    });
  },
};

export default config;
