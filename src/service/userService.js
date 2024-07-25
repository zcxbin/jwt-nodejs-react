import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'
import db from '../models/index.js'

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const hashUserPassword = userPassword => {
  let hashUserPassword = bcrypt.hashSync(userPassword, salt)
  return hashUserPassword
}

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password)

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass
    })
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

const getUserList = async () => {
  // Test relationship
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ['id', 'username', 'email'],
    include: { model: db.Group, attributes: ['id', 'name', 'description'] },
    raw: true,
    nest: true
  })

  let roles = await db.Role.findAll({
    include: { model: db.Group, where: { id: 1 } },
    raw: true,
    nest: true
  })
  console.log('>>>check NewUser: ', newUser)
  console.log('>>>check new role: ', roles)

  let users = []
  users = await db.User.findAll()
  return users
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // })
  // try {
  //   const [rows, fields] = await connection.execute('SELECT * FROM user')
  //   return rows
  // } catch (err) {
  //   console.log('>>> check err: ', err)
  // }
}

const deleteUser = async userId => {
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // })
  // try {
  //   const [rows, fields] = await connection.execute(
  //     'DELETE FROM user WHERE id=?',
  //     [id]
  //   )
  //   return rows
  // } catch (err) {
  //   console.log('>>> check err: ', err)
  // }

  await db.User.destroy({
    where: { id: userId }
  })
}

const getUserById = async id => {
  let users = {}
  users = await db.User.findOne({
    where: { id: id }
  })
  return users
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // })
  // try {
  //   const [rows, fields] = await connection.execute(
  //     'SELECT * FROM user WHERE id=?',
  //     [id]
  //   )
  //   return rows
  // } catch (err) {
  //   console.log('>>> check err: ', err)
  // }
}

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id
      }
    }
  )
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird
  // })
  // try {
  //   const [rows, fields] = await connection.execute(
  //     'UPDATE user SET email = ?, username = ? WHERE id = ?',
  //     [email, username, id]
  //   )
  //   return rows
  // } catch (err) {
  //   console.log('>>> check err: ', err)
  // }
}
export default {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor
}
