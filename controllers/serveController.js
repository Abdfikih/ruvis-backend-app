const serve = require("../models/serve");

module.exports = {
  addserve: async (req, res) => {
    const newserve = new serve(req.body);

    try {
      await newserve.save();
      res
        .status(201)
        .json({ status: true, message: "serve item successfully created" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getserveById: async (req, res) => {
    const serveId = req.params.id;

    try {
      const serve = await serve.findById(serveId); // populate the shop field if needed

      if (!serve) {
        return res
          .status(404)
          .json({ status: false, message: "serve item not found" });
      }

      res.status(200).json(serve);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getservesByshop: async (req, res) => {
    const shopId = req.params.shopId;

    try {
      const serves = await serve.find({ shop: shopId });

      if (!serves || serves.length === 0) {
        return res
          .status(404)
          .json({
            status: false,
            message: "No serve items found for this shop",
          });
      }

      res.status(200).json(serves);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteserveById: async (req, res) => {
    const serveId = req.params.id;

    try {
      const serve = await serve.findByIdAndDelete(serveId);

      if (!serve) {
        return res
          .status(404)
          .json({ status: false, message: "serve item not found" });
      }

      res
        .status(200)
        .json({ status: true, message: "serve item successfully deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  serveAvailability: async (req, res) => {
    const serveId = req.params.id;

    try {
      // Find the shop by its ID
      const serve = await serve.findById(serveId);

      if (!shop) {
        return res.status(404).json({ message: "serve not found" });
      }

      // Toggle the isAvailable field
      serve.isAvailable = !serve.isAvailable;

      // Save the changes
      await serve.save();

      res.status(200).json({ message: "Availability toggled successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateserveById: async (req, res) => {
    const serveId = req.params.id;

    try {
      const updatedserve = await serve.findByIdAndUpdate(serveId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedserve) {
        return res
          .status(404)
          .json({ status: false, message: "serve item not found" });
      }

      res
        .status(200)
        .json({ status: true, message: "serve item successfully updated" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addserveTag: async (req, res) => {
    const serveId = req.params.id;
    const { tag } = req.body; // Assuming the tag to be added is sent in the request body

    if (!tag) {
      return res
        .status(400)
        .json({ status: false, message: "Tag is required" });
    }

    try {
      const serve = await serve.findById(serveId);

      if (!serve) {
        return res
          .status(404)
          .json({ status: false, message: "serve item not found" });
      }

      // Check if tag already exists
      if (serve.serveTags.includes(tag)) {
        return res
          .status(400)
          .json({ status: false, message: "Tag already exists" });
      }

      serve.serveTags.push(tag);
      await serve.save();

      res
        .status(200)
        .json({ status: true, message: "Tag successfully added", data: serve });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getRandomservesByCode: async (req, res) => {
    try {
      // If code is provided in the params, try to fetch matching serve items

      const randomserveItems = await serve.aggregate([
        { $match: { code: req.params.code } },
        { $sample: { size: 5 } },
        { $project: { _id: 0 } },
      ]);

      res.status(200).json(randomserveItems);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addserveType: async (req, res) => {
    const serveId = req.params.id;
    const { serveType } = req.body.serveType; // Assuming the tag to be added is sent in the request body

    try {
      const serve = await serve.findById(serveId);

      if (!serve) {
        return res
          .status(404)
          .json({ status: false, message: "serve item not found" });
      }

      // Check if tag already exists
      if (serve.serveType.includes(serveType)) {
        return res
          .status(400)
          .json({ status: false, message: "Type already exists" });
      }

      serve.serveType.push(serveType);
      await serve.save();

      res
        .status(200)
        .json({ status: true, message: "Type successfully added" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getRandomservesByCategoryAndCode: async (req, res) => {
    const { category, code } = req.params; // Assuming category, code, and value are sent as parameters

    try {
      let serves = await serve.aggregate([
        { $match: { category: category, code: code } },
        { $sample: { size: 10 } },
      ]);

      if (!serves || serves.length === 0) {
        serves = await serve.aggregate([
          { $match: { code: code } },
          { $sample: { size: 10 } },
        ]);
      } else {
        serves = await serve.aggregate([{ $sample: { size: 10 } }]);
      }

      res.status(200).json(serves);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
