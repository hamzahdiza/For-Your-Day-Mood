const express = require("express");
const mainController = require("../controller/mainController");
const router = express();
const { authentication } = require("../middleware/auth");

router.use(authentication);
router.post("/check-weather", mainController.generateWeather);
router.post("/get-answer-ai", mainController.generateAnswer);
router.post("/get-playlist", mainController.getPlaylist);

module.exports = router;
