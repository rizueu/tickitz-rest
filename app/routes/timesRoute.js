const router = require('express').Router()
const { getTimes, getTimeId } = require('../controllers/timesController')

router.get('/', getTimes)
router.get('/id', getTimeId)

module.exports = router
