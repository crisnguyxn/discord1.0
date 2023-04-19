class CustomAPIErr extends Error{
    constructor(msg, statusCode){
        super(msg),
        this.statusCode = statusCode
    }
}

const handleError = (msg,statusCode) => {
    return new CustomAPIErr(msg,statusCode)
}

module.exports = {CustomAPIErr,handleError}