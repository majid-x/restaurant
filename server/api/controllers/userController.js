const User = require("../modals/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existing = await User.findOne(query);
    if (existing) {
      return res.status(302).json({ message: "user already exist" });
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(302).json({ message: "user doent exist" });
    }
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };
  try {
    const user = await User.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(403).json({ message: "forbidden" });
    }
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const makeAdmin = async (req, res) => {
  const id = req.params.id;
  const { name, email, photoURL, role } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
};
