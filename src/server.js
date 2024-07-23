import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRouters from './routes/web'
require('dotenv').config()
import bodyParser from 'body-parser'
// import connection from './config/connectDB'
const app = express()

const PORT = process.env.PORT || 8080
// config view engine
configViewEngine(app)

// config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// test connection DB
// connection()

// init web router
initWebRouters(app)

app.listen(PORT, () => {
  console.log('>>> JWT Backend is running on the port ' + PORT)
})
