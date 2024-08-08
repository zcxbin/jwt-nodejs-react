import db from "../models/index"
import bcrypt from 'bcrypt'
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const hashUserPassword = userPassword => {
    let hashUserPassword = bcrypt.hashSync(userPassword, salt)
    return hashUserPassword
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: {
            email: userEmail,
        }
    })
    if (user) return true;
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: {
            phone: userPhone,
        }
    })
    if (user) return true;
    return false;
}


const registerNewUser = async (rawUserData) => {

    try {
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1,
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: 'The phone number is already exist',
                EC: 1,
            }
        }
        //hass user password
        let hassPassword = hashUserPassword(rawUserData.password)
        // create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hassPassword,
            phone: rawUserData.phone
        })
        return {
            EM: 'User registered successfully',
            EC: 0,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs in service',
            EC: '-2',
        }
    }


}

export default {
    registerNewUser
}