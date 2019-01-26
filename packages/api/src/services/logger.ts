import * as winston from 'winston'

export const loggerOptions = {
  level: 'info',
  format: winston.format.cli(),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
}

export const logger = winston.createLogger(loggerOptions)

export const logStdout = (data: any) => logger.info(`stdout: ${String(data)}`)
