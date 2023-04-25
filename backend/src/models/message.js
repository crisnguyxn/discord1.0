const mongoose = require('mongoose')

const ImageSchema =  mongoose.Schema({
    img:{
        data:String,
        contentType:String
    }
})

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
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    images:[ImageSchema]
},{collection:"Message List"})

module.exports =  mongoose.model('Message',MessageSchema)