const connection = require('../database')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*')

    return res.json(ongs)
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = generateUniqueId()

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return res.json({ id })
  },
  async delete(req, res) {
    const { id } = req.params
    const ong_id = req.headers.authorization

    const ong = await connection('ongs')
      .where('id', id)
      .select('id')
      .first()

    if (!ong) {
      return res.status(404).json({ error: 'Ong inexistente' })
    }

    console.log(ong, ong_id)
    if (ong.id !== ong_id) {
      return res.status(401).json({ error: 'Operação não permitida' })
    }

    await connection('ongs')
      .where('id', id)
      .delete()

    return res.status(204).send()
  },
}
