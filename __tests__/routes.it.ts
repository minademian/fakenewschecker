import request from 'supertest';
import app from '../server';

describe("Main route", () => {
  it("should return 200", async () => {
    const response = await request(app)
      .get("/")

    expect(response.status).toBe(200);
  });
    it("should return 200", async () => {
    const response = await request(app)
      .get("/")

    expect(response.body).toStrictEqual({ alive: true });
  });
});