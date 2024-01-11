import dotenv from 'dotenv';

dotenv.config();

const ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_SPREADSHEET_ID',
  'APP_ID',
  'APP_SECRET',
  'VERIFY_TOKEN',
  'APP_URL',
  'APP_PORT',
  'SESSION_SECRET',
];

type Origin = string | boolean | RegExp;
type EnvVar = string | undefined;
type Port = string | number | undefined;
type EnvVarsFn = () => void;

type Config = {
  GoogleSpreadsheetId: EnvVar;
  GoogleSpreadsheetRange: EnvVar;
  apiPrefix: EnvVar;
  apiVersion: EnvVar;
  host: EnvVar;
  GoogleApiDomain: EnvVar;
  GoogleApiVersion: EnvVar;
  GoogleClientSecret: EnvVar;
  GoogleClientId: EnvVar;
  appPort: Port;
  port: Port;
  appUrl: Origin;
  apiUrl: EnvVar;
  GoogleApiUrl: Origin;
  redirectUri: EnvVar;
  checkEnvVariables: EnvVarsFn;
  SessionSecret: EnvVar;
  ApiStorePrefix: EnvVar;
};

const config: Config = {
  GoogleSpreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
  GoogleSpreadsheetRange: process.env.GOOGLE_SPREADSHEET_RANGE,
  apiPrefix: 'api',
  apiVersion: 'v1',
  appPort: process.env.APP_PORT || 3000,
  host: 'http://localhost',
  GoogleApiDomain: 'https://www.googleapis.com/auth',
  GoogleApiVersion: '',
  GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  GoogleClientId: process.env.GOOGLE_CLIENT_ID,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  port: process.env.PORT || 8000,
  SessionSecret: process.env.SESSION_SECRET,
  ApiStorePrefix: process.env.API_STORE_PREFIX,
  get appUrl(): Origin {
    return `${this.host}:${this.appPort}`;
  },
  get apiUrl() {
    return `${this.host}:${this.port}`;
  },
  get GoogleApiUrl(): Origin {
    return `${this.GoogleApiDomain}`;
  },
  checkEnvVariables(): void {
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
