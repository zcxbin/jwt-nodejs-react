import loginRegisterService from "../service/loginRegisterService"
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        // req.body: email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters', // Error message
                EC: '1', // Error code
                DT: '', // date
            })
        }
        if (!req.body.password || req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must have more than 3 letters', // Error message
                EC: '1', // Error code
                DT: '', // date
            })
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, // Error message
            EC: data.EC, // Error code
            DT: '', // date
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'error from server', // Error message
            EC: '-1', // Error code
            DT: '', // date
        })
    }
    console.log('register', req.body)
}

export default {
    testApi,
    handleRegister
}