const express = require('express')
const { createRoom, getVoiceRoom, postMessage, getMessages ,getChannel} = require('../controllers/discord-room')
const router = express.Router()

router.route('/create').post(createRoom)
router.route('/:id').get(getVoiceRoom)
router.route('/message').post(postMessage)
router.route('/message/:id').get(getMessages)
router.route('/channels/:id').get(getChannel)
module.exports = router