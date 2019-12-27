import fs from 'fs'
import dotenv from 'dotenv-safe'
import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env' })
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production'

export const SESSION_SECRET = process.env.SESSION_SECRET
export const MONGODB_URI = prod ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.')
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.')
  }
  process.exit(1)
}
