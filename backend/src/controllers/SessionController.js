const connection = require('../database')

module.exports = {
  async create(req, res) {
    const { id } = req.body

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong) {
      return res.status(400).json({
        error: 'Nenhuma ong encontrada',
      })
    }

    return res.json(ong)
  },
}
