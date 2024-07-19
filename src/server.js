import express from 'express'
import configViewEngine from './configs/viewengine'
import initWebRouters from './routes/web'
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 8080
// config view engine
configViewEngine(app)

// init web router
initWebRouters(app)

app.listen(PORT, () => {
  console.log('>>> JWT Backend is running on the port ' + PORT)
})
