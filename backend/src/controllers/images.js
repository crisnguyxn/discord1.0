const asyncWrapper = require('../middlewares/async');
const Image = require('../models/image')
const fs = require('fs')
const uploadImg = asyncWrapper(async (req,res) => {
    let img = {
        data:fs.readFileSync(req.file.path),
        contentType:req.file.mimetype
    }
    const data = await Image.create({
        img,
        msgId:req.body.msgId
    })
    let imgConfig = {
        base64String:data.img.data.toString("base64"),
        contentType:data.img.contentType,
        msgId:data.msgId
    } 
    res.status(200).json({imgConfig})
})

module.exports = {
    uploadImg
}