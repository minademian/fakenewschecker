import request from 'supertest';
import app from '../app';

let req = request(app);

describe('Google Spreadsheet routes', () => {
  it('/data route should return sheet data', async () => {
    const response = await req.get('/data');

    expect(response.status).toBe(200);
    expect(response.body).toBe({});
  });
});
