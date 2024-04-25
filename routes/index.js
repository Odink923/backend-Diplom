const Router = require('express')
const router = new Router()
const appointmentRouter = require('./appointmentRouter')
const userRouter = require('./userRouter')
const activityRouter = require('./activityRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/activity', activityRouter)
router.use('/appointment', appointmentRouter)

module.exports = router