const express = require("express");
const Menu = require("../modals/Menu");
const { getAllMenuItems } = require("../controllers/menuControllers");
const router = express.Router();

// get all menu items
router.get("/", getAllMenuItems);
module.exports = router;
