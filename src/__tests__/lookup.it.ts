import request from 'supertest';
import nock from 'nock';
import app from '../app';
import allRows from './data_2.json';
import config from '../services/config';

let req = request(app);

describe('Google Spreadsheet routes', () => {
  it('/data route should return sheet data', async () => {});
});
