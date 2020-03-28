const knex = require('knex')
const knexConfig = require('../../knexfile')

const connectionConfig = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development

const connection = knex(connectionConfig)

module.exports = connection
