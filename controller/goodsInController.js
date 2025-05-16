const GoodsIn = require('../model/GoodsIn');
const Item = require('../model/Item'); 

// Add a new goods in entry
exports.addGoodsIn = async (req, res) => {
  try {
    const { entryNumber, item, quantity, expiryDate } = req.body;

    if (!entryNumber || !item || !quantity || !expiryDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEntry = await GoodsIn.create({ entryNumber, item, quantity, expiryDate });
    const existingItem = await Item.findById(item);
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    existingItem.quantity += parseInt(quantity);
    await existingItem.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all goods in entries
exports.getAllGoodsIn = async (req, res) => {
  try {
    const entries = await GoodsIn.find().populate('item', 'itemName').sort({ dateAdded: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
