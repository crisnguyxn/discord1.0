const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name must be provided'],
        trim:true,
        maxlength:[20,'Name can not be more 20 characters']
    },
    email:{
        type:String,
        required:[true,'Email must be provided'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Password must be provided'],
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('User',UserSchema)