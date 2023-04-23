const mongoose = require('mongoose')

const ImgSchema = mongoose.Schema({
    img:{
        data:Buffer,
        contentType:String
    },
    msgId:{
        type:String,
        required:true
    }
},{collection:"Image List"})

module.exports = mongoose.model('Images',ImgSchema)