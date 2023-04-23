const express = require('express')
const { uploadImg } = require('../controllers/images')

const router = express.Router()

router.route('/').post(uploadImg)

module.exports = router