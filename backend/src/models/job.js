const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company must be provided']
    },
    position:{
        type:String,
        required:[true,'Position must be provided']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['PENDING','INTERVIEW'],
        default:'PENDING'
    },
    userId:{
        type:String
    }
})
module.exports = mongoose.model('Job',jobSchema)