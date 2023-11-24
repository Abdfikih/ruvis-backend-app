const router = require("express").Router();
const shopController = require("../controllers/shopController");


// CREATE shop
router.post("/",  shopController.addshop);

// Sevices availability
router.patch("/:id", shopController.serviceAvailability);

// GET shop BY ID
router.get("/:code", shopController.getRandomshops);

// // GET ALL shop
router.get("/byId/:id", shopController.getshop);


module.exports = router