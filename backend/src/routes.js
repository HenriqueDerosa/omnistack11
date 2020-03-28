const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const ongController = require('./controllers/OngController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/ongs', ongController.index)
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      whatsapp: Joi.string()
        .min(10)
        .max(11)
        .required(),
      city: Joi.string().required(),
      uf: Joi.string()
        .length(2)
        .required(),
    }),
  }),
  ongController.create
)
routes.delete(
  '/ongs/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string()
        .length(8)
        .required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .length(8)
        .required(),
    }).unknown(),
  }),
  ongController.delete
)

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string()
        .length(8)
        .required(),
    }).unknown(),
  }),
  profileController.index
)
routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  sessionController.create
)

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentController.index
)
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  incidentController.create
)
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  incidentController.delete
)

module.exports = routes
