const Item=require('../model/Item')

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const { itemName, description, entry, expiryDate } = req.body;

        if (!itemName || !description || !entry || !expiryDate) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // Create a new item
        const newItem = await Item.create({
            itemName,
            description,
            entry,
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