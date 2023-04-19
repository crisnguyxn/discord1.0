const express = require('express')
const { register, login } = require('../controllers/authen')
const getToken = require('../middlewares/authRoom')
const router = express.Router()

router.route('/register').post(register)

router.route('/login').post(getToken,login)

module.exports = router