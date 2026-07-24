const request = require('supertest');
const app = require('../src/app');

describe('Employee API', () => {
  it('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/employees creates an employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .send({ name: 'Jane Doe', email: 'jane@example.com', department: 'Engineering', role: 'SRE', salary: 90000, hireDate: '2026-01-01' });
    expect([200, 201]).toContain(res.statusCode);
  });
});