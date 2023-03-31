const express = require("express");
const mainController = require("../controller/mainController");
const router = express();
const { authentication } = require("../middleware/auth");

router.use(authentication);
router.post("/check-weather", mainController.generateWeather);

module.exports = router;
