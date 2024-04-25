const Router = require('express')
const router = new Router()
const activityController = require('../controllers/activityController')

router.post('/',activityController.create)
router.get('/',activityController.getAll)

module.exports = router