import express, { Application } from 'express'
import session from 'express-session'
import mongo from 'connect-mongo'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import { MONGODB_URI, SESSION_SECRET } from './config/secrets'
import routes from './routes'
import logger from './config/logger'

const MongoStore = mongo(session)

// Create Express server
const app: Application = express()

// Connect to MongoDB
const mongoUrl = MONGODB_URI
mongoose.Promise = bluebird

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    logger.info(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    )
  })

// Express configuration
app.set('port', process.env.PORT || 3333)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
}))

// Primary app route
app.use('/', routes)

export default app
