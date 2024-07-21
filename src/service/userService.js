import mysql from 'mysql2'
import bcrypt from 'bcrypt'

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
})

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

const getUserList = () => {
  let users = []
  connection.execute('SELECT * FROM users ', function (err, results, fields) {
    if (err) {
      console.log(err)
    }
    console.log(">>> check result", results)
  })
}

export default {
  createNewUser,
  getUserList
}
