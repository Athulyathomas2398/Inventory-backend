const mongoose=require('mongoose')

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  entry: { type: String, required: true }, // Entry number
  expiryDate: { type: Date, required: true }

});

const Item= mongoose.model('Item', itemSchema);
module.exports=Item