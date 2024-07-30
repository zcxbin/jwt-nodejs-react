import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRouters from './routes/web'
require('dotenv').config()
import initApiRouters from './routes/api'
import bodyParser from 'body-parser'
import configCors from './config/CORS'
// import connection from './config/connectDB'
const app = express()

const PORT = process.env.PORT || 8080

configCors(app);


// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connection DB
// connection()

// init web router
initWebRouters(app)
initApiRouters(app)
app.listen(PORT, () => {
  console.log('>>> JWT Backend is running on the port ' + PORT)
})
