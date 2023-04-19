const { CustomAPIErr } = require("../errors/custom-error")

const handleErrMiddlewares = (err,req,res,next) => {
    if(err instanceof CustomAPIErr){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:err.message})
}

module.exports = handleErrMiddlewares