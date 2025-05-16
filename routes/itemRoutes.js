const express = require('express');
const { createItem,getItems } = require('../controller/itemController');

const router = express.Router();

router.post('/add', createItem);
router.get('/items', getItems);

module.exports = router;
