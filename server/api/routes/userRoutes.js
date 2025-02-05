const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
} = require("../controllers/userController");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const verifyToken = require("../middleware/verifyToken");
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.post("/", createUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.get("/admin/:email", verifyToken, getAdmin);

module.exports = router;
