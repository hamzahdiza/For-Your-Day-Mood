const express = require("express");
const router = express();
const userRoutes = require("./userRoutes");
const mainRoutes = require("./mainRoutes");

router.use("/", userRoutes);
router.use("/", mainRoutes);

module.exports = router;
