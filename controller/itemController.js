const Item=require('../model/Item')

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const { itemName, description, entry, expiryDate } = req.body;

        if (!itemName || !description ) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Create a new item
        const newItem = await Item.create({
            itemName,
            description,
            //entry,
            expiryDate
        });

        
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find()
      
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, description, entry, expiryDate } = req.body;

    if (!itemName || !description ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

   
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found!" });
    }

    
    item.itemName = itemName;
    item.description = description;
    //  item.entry = entry;
    item.expiryDate = expiryDate;

    
    await item.save();

    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};