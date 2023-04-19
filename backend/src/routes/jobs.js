const express = require('express')
const { getAllJobs, getOne, createJob, updateJob, deleteJob, getJobsById } = require('../controllers/jobs')
const authMiddleware = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')
const router = express.Router()

router.route('/').get(authMiddleware,authAdmin,getAllJobs)
router.route('/:id').get(authMiddleware,getOne)
router.route('/').post(authMiddleware,createJob)
router.route('/:id').patch(authMiddleware,updateJob)
router.route('/:id').delete(authMiddleware,deleteJob)
router.route('/getJobByUserId').get(authMiddleware,getJobsById)
module.exports = router