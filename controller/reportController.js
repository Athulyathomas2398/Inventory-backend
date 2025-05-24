const GoodsIn=require('../model/GoodsIn')
const GoodsOut=require('../model/GoodsOut')
const Item=require('../model/Item')

exports.getStockReport = async (req, res) => {
  try {
    const goodsInData = await GoodsIn.find().populate('item', 'itemName').sort({ dateAdded: 1 }); 
    const goodsOutData = await GoodsOut.find().populate('item', '_id');

   
    const goodsOutMap = {};
    goodsOutData.forEach(entry => {
        if (!entry.item || !entry.item._id) {
    console.warn("Skipping GoodsOut entry with missing item reference:", entry);
    return;
  }
      const itemId = entry.item._id.toString();
      goodsOutMap[itemId] = (goodsOutMap[itemId] || 0) + entry.quantity;
    });

    
    const report = [];

    for (const entry of goodsInData) {
      if (!entry.item||!entry.item._id) continue;
      const itemId = entry.item._id.toString();
      

      
      let availableQty = entry.quantity;

      if (goodsOutMap[itemId] > 0) {
        const deduction = Math.min(availableQty, goodsOutMap[itemId]);
        availableQty -= deduction;
        goodsOutMap[itemId] -= deduction;
      }

      report.push({
        _id: entry._id,
        itemId,
        itemName: entry.item.itemName,
        expiryDate: entry.expiryDate,
        entryNumber: entry.entryNumber,
        availableQuantity: availableQty,
        dateAdded: entry.dateAdded
      });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Error generating stock report:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.deleteStockReportEntry = async (req, res) => {
  try {
    const id  = req.params.id;
    await GoodsIn.findByIdAndDelete(id);
    res.status(200).json({ message: 'Report entry deleted successfully' });
    console.log('Report entry deleted successfully');
    
  } catch (error) {
    console.error('Error deleting report entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};