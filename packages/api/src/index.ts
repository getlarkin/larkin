require('dotenv').config()

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as WebSocket from 'ws'
import * as http from 'http'

import { loggerMiddleware } from '@larkin/api/middleware/logger'
import { authMiddleware } from '@larkin/api/middleware/auth'
import { logger } from '@larkin/api/services/logger'
import { onConnection } from '@larkin/api/controllers/ws'

import { router as ContainerController } from '@larkin/api/controllers/containers'
import { router as AuthController } from '@larkin/api/controllers/auth'
import { router as PublicApiController } from '@larkin/api/controllers/public'

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(authMiddleware)
app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(loggerMiddleware)
app.enable('trust proxy')

app.get('/health', (_req, res) => {
  res.send('ok')
})

app.use('/containers', ContainerController)
app.use('/auth', AuthController)
app.use('/', PublicApiController)

wss.on('connection', onConnection)

const port = process.env.PORT || 5588
server.listen(port, () => {
  logger.info(`docker-run-core is running: http://localhost:${port}`)
  logger.info(`    NODE_ENV: ${process.env.NODE_ENV}`)
})
