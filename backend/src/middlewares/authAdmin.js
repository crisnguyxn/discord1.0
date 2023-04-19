const { handleError } = require("../errors/custom-error");
const asyncWrapper = require("./async");

const authAdmin = asyncWrapper(async(req,res,next) => {
        const {email,id} =  req.user;
        if(email === 'admin@gmail.com'){
            return next()
        }else{
            return next(handleError('You dont have permission to access this route',401))
        }
    }
)

module.exports = authAdmin