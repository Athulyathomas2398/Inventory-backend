const GoodsIn = require('../model/GoodsIn');
const Item = require('../model/Item'); 

// Add a new goods in entry
exports.addGoodsIn = async (req, res) => {
  try {
    // const { entryNumber, item, quantity, expiryDate, dateAdded } = req.body;
const { item, itemName, quantity, expiryDate} = req.body;
    // if (!entryNumber || !item || !quantity || !expiryDate) {
    //  return res.status(400).json({ message: 'All fields are required' });
    //}

    if ( !itemName || !quantity ) {
     return res.status(400).json({ message: 'All fields are required' });
    }
    
   //note: const duplicateEntry = await GoodsIn.findOne({ entryNumber, item });
   const duplicateEntry = await GoodsIn.findOne({ itemName });
    if (duplicateEntry) {
      return res.status(400).json({ message: 'Duplicate entry for this item and entry number' });
    }

    
//    const newEntry = await GoodsIn.create({ entryNumber, item, quantity, expiryDate, dateAdded });

   //const existingItem = await Item.findById(item)
    const existingItem = await Item.findOne({itemName  });
    // 
        const newEntry = await GoodsIn.create({ item: existingItem._id, itemName, quantity, expiryDate});

    existingItem.quantity += parseInt(quantity);
    await existingItem.save();

    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error in addGoodsIn:", error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// exports.addGoodsIn = async (req, res) => {
//   try {
//     const { itemName, quantity, expiryDate } = req.body;

//     const item = await Item.findOne({  itemName });

//     if (!item) {
//       return res.status(404).json({ message: 'Item not found ' });
//     }

//     const goodsIn = new GoodsIn({
//       item: item._id,
//       quantity,
      
//       entryNumber,
//       dateAdded: new Date(),
//     });

//     await goodsIn.save();

//     res.status(201).json({ message: 'Goods added successfully', goodsIn });
//   } catch (error) {
//     console.error('Error in addGoodsIn:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Get all goods in entries
exports.getAllGoodsIn = async (req, res) => {
  try {
    const entries = await GoodsIn.find().populate('item', 'itemName').sort({ dateAdded: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
