const mongoose = require('mongoose')

const DiscordRoom = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    isText:{
        type:Boolean
    }
},{collection:"Discord Room"})

module.exports = mongoose.model('discordRoom',DiscordRoom)