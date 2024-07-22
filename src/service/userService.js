import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const hashUserPassword = userPassword => {
  let hashUserPassword = bcrypt.hashSync(userPassword, salt)
  return hashUserPassword
}

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password)
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })

  try {
    const [rows, fields] = await connection.execute(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, hashPass, username]
    )
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })
  let users = []

  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users')
    return rows
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

const deleteUser = async id => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })
  try {
    const [rows, fields] = await connection.execute(
      'DELETE FROM users WHERE id=?',
      [id]
    )
    return rows
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

const getUserById = async id => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })
  try {
    const [rows, fields] = await connection.execute(
      'SELECT * FROM users WHERE id=?',
      [id]
    )
    return rows
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })
  try {
    const [rows, fields] = await connection.execute(
      'UPDATE users SET email = ?, username = ? WHERE id = ?',
      [email, username, id]
    )
    return rows
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}
export default {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor
}
