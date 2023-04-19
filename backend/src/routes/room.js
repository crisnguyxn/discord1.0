const express = require('express')
const { createRoom, getRooms, getRoom } = require('../controllers/room')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

router.route('/create').post( authMiddleware,createRoom)
router.route('/get-rooms').get(authMiddleware,getRooms)
router.route('/room/:id').get(authMiddleware,getRoom)
module.exports = router