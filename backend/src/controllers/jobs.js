const { handleError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
const job = require("../models/job");
const Job = require("../models/job");

const getAllJobs = asyncWrapper(async(req,res) => {
    const jobs = await Job.find({})
    res.status(200).json({jobs,count:jobs.length})
})
const getJobsById =asyncWrapper(async(req,res) =>{
    const {id} = req.user;
    const jobs = await Job.find({userId:id})
    res.status(200).json({jobs,count:jobs.length})
})
const getOne = asyncWrapper(async(req,res,next) => {
    const {id:jobId} = req.params;
    const job = await Job.findOne({_id:jobId})
    if(!job){
        return next(handleError(`The job with id: ${jobId} is not existed`,404))
    }
    res.status(200).json({job})
})
const createJob = asyncWrapper(async(req,res) => {
    const {id} = req.user;
    const job = await Job.create({company:req.body.company,position:req.body.position,userId:id})
    res.status(201).json({job})
})
const updateJob = asyncWrapper(async(req,res,next) => {
    const {id:userId,email} = req.user;
    const {id:jobId} = req.params
    const job = await Job.findOne({_id:jobId})
    if(!job){
        return next(handleError(`The job with id: ${jobId} is not existed`,404))
    }
    if(userId === job.userId || email==='admin@gmail.com'){
        const updatedJob = await Job.updateOne({_id:jobId},req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({updatedJob})   
    }else{
        return next(handleError('You dont have permission to access this route',401))
    }
})
const deleteJob = asyncWrapper(async(req,res,next) =>{
    const {id:userId,email} = req.user;
    const {id:jobId} = req.params
    const job = await Job.findOne({_id:jobId})
    if(!job){
        return next(handleError(`The job with id: ${jobId} is not existed`,404))
    }
    if(userId === job.userId || email==='admin@gmail.com'){
        const deletedJob = await Job.deleteOne({_id:jobId})
        res.status(200).json({deletedJob})   
    }else{
        return next(handleError('You dont have permission to access this route',401))
    }
})

module.exports = {
    getAllJobs,getOne,createJob,updateJob,deleteJob,getJobsById
}