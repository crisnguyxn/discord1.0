const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    roomId:{
        type:String,
        required:true
    }
})

module.exports =  mongoose.model('Message',MessageSchema)