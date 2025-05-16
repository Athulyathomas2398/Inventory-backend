const express = require('express');
const router = express.Router();
const { addGoodsOut, getAllGoodsOut } = require('../controller/goodsOutController');

router.post('/goods-out', addGoodsOut);
router.get('/get-goods', getAllGoodsOut);

module.exports = router;
