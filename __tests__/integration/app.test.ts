import request from 'supertest'
import app from '../../src/app'

describe('GET /random-url', () => {
  it('should return 404', async () => {
    const response = await request(app).get('/random')

    expect(response.status).toBe(404)
  })
})
