const router = require("express").Router();
const serveController = require("../controllers/serveController");

// UPADATE category
router.post("/", serveController.addserve);

router.post("/tags/:id", serveController.addserveTag);

router.post("/type/:id", serveController.addserveType);

router.get("/:id", serveController.getserveById);

router.get(
  "/:category/:code",
  serveController.getRandomservesByCategoryAndCode
);

router.delete("/:id", serveController.deleteserveById);

router.patch("/:id", serveController.serveAvailability);

router.get("/shop/:shopId", serveController.getservesByshop);

router.get("/recommendation/:code", serveController.getRandomservesByCode);

module.exports = router;
