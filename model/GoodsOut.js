const mongoose = require('mongoose');

const goodsOutSchema = new mongoose.Schema({
  
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  dateRemoved: {
    type: Date,
    required: true,
  }
});

const GoodsOut = mongoose.model('GoodsOut', goodsOutSchema);
module.exports = GoodsOut;