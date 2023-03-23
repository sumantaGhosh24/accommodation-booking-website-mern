const User = require("../models/userModel");
const Booking = require("../models/bookingModel");

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).json({message: "user does not exists."});
    return res.json(user);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (!req.role === "admin") {
      return res
        .status(400)
        .json({message: "only admin access all user information."});
    }
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).json({message: "no users found."});
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req.role == "admin") {
      return res
        .status(400)
        .json({message: "only admin can update user status."});
    }
    const {active, role} = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        active,
        role,
      },
      {new: true}
    );
    if (!user) {
      return res.status(400).json({message: "User does not exists."});
    }
    return res.json({message: "user status updated"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!req.role == "admin") {
      return res
        .status(400)
        .json({message: "only admin can delete user account."});
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).json({message: "user does not exists."});
    res.json({message: "user deleted."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getDashboard = async (req, res) => {
  try {
    if (!req.role == "admin") {
      return res
        .status(400)
        .json({message: "only admin can get dashboard details."});
    }
    const bookingCount = await Booking.estimatedDocumentCount();
    const categoryCount = await Category.estimatedDocumentCount();
    const hotelCount = await Hotel.estimatedDocumentCount();
    const ratingCount = await Rating.estimatedDocumentCount();
    const userCount = await User.estimatedDocumentCount();
    return res.json({
      bookingCount,
      categoryCount,
      hotelCount,
      ratingCount,
      userCount,
    });
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getDashboard,
};
