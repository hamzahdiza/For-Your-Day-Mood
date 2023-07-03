const express = require("express");
const mainController = require("../controller/mainController");
const router = express();
const { authentication } = require("../middleware/auth");

router.use(authentication);
router.post("/check-weather", mainController.generateWeather);
router.post("/get-answer-ai", mainController.generateAnswer);
router.post("/get-playlist", mainController.getPlaylist);
router.post("/get-tracks", mainController.getTrack);
router.get("/get-news-music", mainController.getNewsMusic);
router.get("/get-news-entertainment", mainController.getNewsEntertainment);
router.post("/search-news", mainController.searchNews);

module.exports = router;
