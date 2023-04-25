const asyncWrapper = require("../middlewares/async");
const DiscordRoom = require("../models/discord-room");
const Image = require("../models/image");
const Message = require("../models/message");
const fs = require('fs');
const createRoom = asyncWrapper(async (req, res) => {
  const data = await DiscordRoom.create(req.body);
  res.status(200).json({ data });
});
const getVoiceRoom = asyncWrapper(async (req, res) => {
  const data = await DiscordRoom.find({ roomId: req.params.id });
  res.status(200).json(data)
});

const postMessage = asyncWrapper(async(req,res) =>{

  let images = []

  req.files.forEach(element => {
    images.push({
      img:{
        data:fs.readFileSync(element.path,{encoding:'base64'}).toString(),
        contentType:element.mimetype
      }
    })
  });

  const data = await Message.create({
    userId:req.body.userId,
    message:req.body.message,
    username:req.body.username,
    createdAt:req.body.createdAt,
    roomId:req.body.roomId,
    images:images
  })
  res.status(200).json(data)
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
