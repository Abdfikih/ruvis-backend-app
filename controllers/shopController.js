const shop =require("../models/shop")

module.exports ={
     addshop: async (req, res) => {
        const newshop = new shop(req.body);
    
        try {
            await newshop.save();
            res.status(201).json({ status: true, message: 'shop successfully created' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

     getRandomshops: async (req, res) => {
        try {
            let randomshops = [];
    
            // Check if code is provided in the params
            if (req.params.code) {
                randomshops = await shop.aggregate([
                    { $match: { code: req.params.code } },
                    { $sample: { size: 5 } },
                    { $project: {  __v: 0 } }
                ]);
            }
            
            // If no code provided in params or no shops match the provided code
            if (!randomshops.length) {
                randomshops = await shop.aggregate([
                    { $sample: { size: 5 } },
                    { $project: {  __v: 0 } }
                ]);
            }
    
            // Respond with the results
            if (randomshops.length) {
                res.status(200).json(randomshops);
            } else {
                res.status(404).json({ message: 'No shops found' });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

     serviceAvailability: async (req, res) => {
        const shopId = req.params; 
    
        try {
            // Find the shop by its ID
            const shop = await shop.findById(shopId);
    
            if (!shop) {
                return res.status(404).json({ message: 'shop not found' });
            }
    
            // Toggle the isAvailable field
            shop.isAvailable = !shop.isAvailable;
    
            // Save the changes
            await shop.save();
    
            res.status(200).json({ message: 'Availability toggled successfully', isAvailable: shop.isAvailable });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteshop: async (req, res) => {
        const id  = req.params;
    
        if (!id) {
            return res.status(400).json({ status: false, message: 'shop ID is required for deletion.' });
        }
    
        try {
            await shop.findByIdAndRemove(id);
    
            res.status(200).json({ status: true, message: 'shop successfully deleted' });
        } catch (error) {
            console.error("Error deleting shop:", error);
            res.status(500).json({ status: false, message: 'An error occurred while deleting the shop.' });
        }
    },
    getshop: async (req, res) => {
        const id = req.params.id;
        console.log(id);

        try {
            const shop = await shop.findById(id) // populate the shop field if needed

            if (!shop) {
                return res.status(404).json({ status: false, message: 'shop item not found' });
            }

            res.status(200).json(shop);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
}