import userService from '../service/userService'

const handleHelloWorld = (req, res) => {
  return res.render('home.ejs')
}
const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList()
  await userService.deleteUser(4)
  return res.render('user.ejs', { userList })
}

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let username = req.body.username

  await userService.createNewUser(email, password, username)
  return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id)
  return res.redirect('/user')
}

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id
  let user = await userService.getUserById(id)
  let userData = {}
  userData = user

  return res.render('user-update.ejs', { userData })
}

const handleUpdateUsers = async (req, res) => {
  let email = req.body.email
  let username = req.body.username
  let id = req.body.id
  await userService.updateUserInfor(email, username, id)
  return res.redirect('/user')
}
export default {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUsers
}
