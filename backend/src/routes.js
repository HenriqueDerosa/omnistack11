const express = require('express')
const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')
const routes = express.Router()

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/incidents', incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)

routes.get('/profile', profileController.index)

routes.get('/sessions', sessionController.create)

module.exports = routes
