const asyncWrapper = require("../middlewares/async");
const DiscordRoom = require("../models/discord-room");
const Message = require("../models/message");

const createRoom = asyncWrapper(async (req, res) => {
  const data = await DiscordRoom.create(req.body);
  res.status(200).json({ data });
});
const getVoiceRoom = asyncWrapper(async (req, res) => {
  const data = await DiscordRoom.find({ roomId: req.params.id });
  res.status(200).json(data)
});

const postMessage = asyncWrapper(async(req,res) =>{
  console.log(req.body);
  const data =  await Message.create(req.body);
  res.status(200).json({data})
})

const getMessages = asyncWrapper(async(req,res)=>{
  const data = await Message.find({roomId:req.params.id})
  res.status(200).json(data)
})

const getChannel = asyncWrapper(async(req,res) => {
  const data =  await DiscordRoom.findOne({_id:req.params.id})
  res.status(200).json(data)
})

module.exports = {
  createRoom,getVoiceRoom,postMessage,getMessages,getChannel
};