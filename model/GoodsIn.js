const mongoose = require('mongoose');

// const goodsInSchema = new mongoose.Schema({
//   entryNumber: {
//     type: String,
//     required: true
//   },
//   item: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Item',
//     required: true
//   },
//   itemName:{
//     type:String,
//     required:true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   expiryDate: {
//     type: Date,
//     required: true
//   },
//   dateAdded: {
//     type: Date,
//     default: Date.now
//   }
// });
const goodsInSchema = new mongoose.Schema({
  entryNumber: {
    type: String,
    //required: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    //required: true
  },
  itemName:{
    type:String,
    required:true,
    unique:true
  },
  quantity: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date
    // required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const GoodsIn = mongoose.model('GoodsIn', goodsInSchema);
module.exports = GoodsIn;