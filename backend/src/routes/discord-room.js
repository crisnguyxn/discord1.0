const express = require('express')
const {createRoom, getTextRoom, postMessage, getMessages ,getChannel} = require('../controllers/discord-room')
const router = express.Router()

router.route('/create').post(createRoom)
router.route('/:id').get(getTextRoom)
router.route('/message').post(postMessage)
router.route('/message/:id').get(getMessages)
router.route('/channels/:id').get(getChannel)

module.exports = router