const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be abe to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: 'ALALA',
        email: 'falasa@lala.com',
        whatsapp: '0193462012',
        city: 'Rio do Sul',
        uf: 'SC',
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(16)
  })
})
