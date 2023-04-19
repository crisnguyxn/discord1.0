const { handleError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
const Room = require("../models/room");

const createRoom = asyncWrapper(async(req,res) => {
    const roomData = req.body["dataRec"];
    Object.assign(roomData,{userId:req.body.userId})
    Object.assign(roomData, {backgroundColor:req.body.backgroundColor})
    const data = await Room.create(roomData)
    res.status(200).json(data)
})
const getRooms = asyncWrapper(async(req,res) => {
    const rooms = await Room.find({})
    res.status(200).json(rooms)
})
const getRoom = asyncWrapper(async(req,res,next) => {
    const room = await Room.findOne({_id:req.params.id})
    if(!room){
        return next(handleError(`Room with id: ${req.params} is not existed`))
    }
    res.status(200).json({room})
})
module.exports = {
    createRoom,getRooms,getRoom
}