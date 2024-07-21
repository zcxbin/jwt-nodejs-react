import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const hashUserPassword = userPassword => {
  let hashUserPassword = bcrypt.hashSync(userPassword, salt)
  return hashUserPassword
}

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password)
  connection.execute(
    'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
    [email, hashPass, username],

    function (err, results, fields) {
      if (err) {
        console.log(err)
      }
    }
  )
}

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird
  })
  let users = []
  //   connection.execute('SELECT * FROM users ', function (err, results, fields) {
  //     if (err) {
  //       console.log(err)
  //       return users
  //     }
  //     users = results
  //     return users
  //   })
  try {
    const [rows, fields] = await connection.execute('SELECT * FROM users')
    return rows
  } catch (err) {
    console.log('>>> check err: ', err)
  }
}

export default {
  createNewUser,
  getUserList
}
