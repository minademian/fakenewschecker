import request from 'supertest';
import app from '../app';

let req = request(app);

describe('System routes', () => {
  it('root route should return 200', async () => {
    const response = await req.get('/api/');

    expect(response.status).toBe(200);
  });
  it('root route should return default message', async () => {
    const response = await req.get('/api/');

    expect(response.body.message).toBe('root route');
  });
  it('ping route should return 200', async () => {
    const response = await req.get('/api/ping');

    expect(response.status).toBe(200);
  });
  it('ping route should return proof of life', async () => {
    const response = await req.get('/api/ping');

    expect(response.body).toStrictEqual({ alive: true });
  });
});

describe('Auth routes', () => {
  it('authorized route should return success', () => {});
});
