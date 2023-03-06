import { server } from 'server';
import request from 'supertest';

describe('Check endpoints test suite', () => {
  describe('POST /api/car', () => {
    const data = {
      'plateNumber': '123abcd',
      'longitude': 40.2,
      'latitude': 33.3,
    };
    it('create new check and return 201', async () => {
      const res = await request(server.getExpressApp())
        .post('/api/check')
        .set('Content-type', 'application/json')
        .send(data);
      expect(res.body).toEqual('URL Check Added Successfully');
      expect(res.body.check).toEqual(
        expect.objectContaining({
          car: expect.objectContaining({
            plate_number: '123abcd',
          }),
        })
      );
      expect(res.statusCode).toBe(201);
    });
  });
});
