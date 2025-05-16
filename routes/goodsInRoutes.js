const express = require('express');
const router = express.Router();
const { addGoodsIn, getAllGoodsIn } = require('../controller/goodsInController');

router.post('/goods-in', addGoodsIn);
router.get('/goods', getAllGoodsIn);

module.exports = router;
