const { handleError } = require("../errors/custom-error");
const asyncWrapper = require("./async");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = asyncWrapper(async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(handleError('No token provided',401))
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        return next(handleError('Not authorized to this route',401))
    }else{
        const {email,id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {email,id}
        return next()
    }
})

module.exports = authMiddleware