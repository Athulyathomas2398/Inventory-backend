const express = require('express');
const { createItem,getItems, updateItem } = require('../controller/itemController');

const router = express.Router();

router.post('/add', createItem);
router.get('/items', getItems);
router.put('/update/:id',updateItem)

module.exports = router;
