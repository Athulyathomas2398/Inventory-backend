const GoodsOut = require('../model/GoodsOut');
const Item = require('../model/Item');

// Add a new GoodsOut entry (i.e., remove stock)
exports.addGoodsOut = async (req, res) => {
  try {
    const {item, itemName, quantity } = req.body;

    if (!itemName || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingItem = await Item.findOne({ itemName });
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

   
    if (existingItem.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock to remove' });
    }

    
    const goodsOutEntry = await GoodsOut.create({
      item: existingItem._id,
      itemName,
      quantity
    });

    
    existingItem.quantity -= quantity;
    await existingItem.save();

    res.status(201).json({ message: 'Stock removed successfully', goodsOutEntry });
  } catch (error) {
    console.error('Error removing stock:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all GoodsOut entries
exports.getAllGoodsOut = async (req, res) => {
  try {
    const entries = await GoodsOut.find()
      .populate('item', 'itemName')
      .sort({ dateRemoved: -1 });

    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching goods out entries:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
