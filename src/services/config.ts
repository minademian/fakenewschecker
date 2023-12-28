import dotenv from 'dotenv';

dotenv.config();

const ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'APP_ID',
  'APP_SECRET',
  'VERIFY_TOKEN',
  'APP_URL',
];

type EnvVar = string | undefined;
type Port = string | number | undefined;

type Config = {
  GoogleApiDomain: EnvVar;
  GoogleApiVersion: EnvVar;
  GoogleClientSecret: EnvVar;
  GoogleClientId: EnvVar;
  appUrl: EnvVar;
  port: Port;
  apiUrl: EnvVar;
  redirectUri: EnvVar;
  whitelistedDomains: EnvVar[];
  checkEnvVariables: Function;
};

const config: Config = {
  GoogleApiDomain: 'https://graph.facebook.com',
  GoogleApiVersion: 'v11.0',
  GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  GoogleClientId: process.env.GOOGLE_CLIENT_ID,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  appUrl: process.env.APP_URL,
  port: process.env.PORT || 3000,

  get apiUrl() {
    return `${this.GoogleApiDomain}/${this.GoogleApiVersion}`;
  },
  get whitelistedDomains() {
    return [this.appUrl];
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
