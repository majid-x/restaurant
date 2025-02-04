const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
} = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/admin/:email", getAdmin);
router.patch("/admin/:id", makeAdmin);
module.exports = router;
