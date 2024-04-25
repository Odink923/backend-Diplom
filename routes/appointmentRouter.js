const Router = require('express')
const router = new Router()
const appointmentController = require('../controllers/appointmentController')

router.post('/', appointmentController.create)
router.get('/', appointmentController.getAll)
router.get('/:id',appointmentController.getOne)

module.exports = router