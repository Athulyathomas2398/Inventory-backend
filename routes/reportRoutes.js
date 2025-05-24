const express = require('express')
const { getStockReport,deleteStockReportEntry } = require('../controller/reportController')
const router = express.Router()

router.get('/report', getStockReport)
router.delete('/delete-report/:id', deleteStockReportEntry);

module.exports = router