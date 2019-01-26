import { loggerOptions } from '../services/logger'

const expressWinston = require('express-winston')

export const loggerMiddleware = expressWinston.logger(loggerOptions)
