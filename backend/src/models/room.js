const mongoose = require('mongoose')


const RoomSchema = mongoose.Schema({    
    id:{
        type:String,
        required:true
    }, 
    name:{
        type:String,
        required:true
    }, 
    enabled:{
        type:Boolean,
        default:false
    }, 
    description:{
        type:String,
        required:true
    }, 
    customer:{
        type:String,
        required:true
    }, 
    recording_info:{
        enable:{
            type:Boolean,
            default:false
        }
    }, 
    template_id:{
        type:String,
       required:true
    }, 
    region:{
        type:String,
       required:true
    }, 
    created_at:{
        type:Date,
        required:true
    }, 
    updated_at:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        required:true
    } ,
    backgroundColor:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Room',RoomSchema)