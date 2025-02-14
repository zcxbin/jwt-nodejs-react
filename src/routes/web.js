import express from 'express'
import homeController from '../controller/homeController'
const router = express.Router()

/**
 *
 * @param {*} app : express app
 */

const initWebRouters = app => {
  router.get('/', homeController.handleHelloWorld)
  router.get('/user', homeController.handleUserPage)
  router.post('/users/create-user', homeController.handleCreateNewUser)
  router.post('/delete-user/:id', homeController.handleDeleteUser)
  router.get('/update-user/:id', homeController.getUpdateUserPage)
  router.post('/user/update-user', homeController.handleUpdateUsers)
  return app.use('/', router)
}

export default initWebRouters
