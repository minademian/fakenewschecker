import dotenv from 'dotenv';

dotenv.config();

const ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'APP_ID',
  'APP_SECRET',
  'VERIFY_TOKEN',
  'APP_URL',
  'APP_PORT',
];

type Origin = string | boolean | RegExp;
type EnvVar = string | undefined;
type Port = string | number | undefined;

type Config = {
  host: EnvVar;
  GoogleApiDomain: EnvVar;
  GoogleApiVersion: EnvVar;
  GoogleClientSecret: EnvVar;
  GoogleClientId: EnvVar;
  appPort: Port;
  port: Port;
  appUrl: Origin;
  apiUrl: EnvVar;
  GoogleApiUrl: EnvVar;
  redirectUri: EnvVar;
  checkEnvVariables: Function;
};

const config: Config = {
  appPort: process.env.APP_PORT || 3000,
  host: 'http://localhost',
  GoogleApiDomain: 'https://www.googleapis.com/auth',
  GoogleApiVersion: '',
  GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  GoogleClientId: process.env.GOOGLE_CLIENT_ID,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  port: process.env.PORT || 8000,

  get appUrl(): Origin {
    return `${this.host}:${this.appPort}`;
  },
  get apiUrl() {
    return `${this.host}:${this.port}`;
  },
  get GoogleApiUrl() {
    return `${this.GoogleApiDomain}/`;
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
