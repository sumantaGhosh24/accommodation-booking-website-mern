const Booking = require("../models/bookingModel");
const Category = require("../models/categoryModel");
const Hotel = require("../models/hotelModel");
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

const userCtrl = {
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user)
        return res.status(400).json({message: "User does not exists."});
      res.json({message: "User deleted."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      if (!users) {
        return res.status(400).json({message: "Users does not exists."});
      }
      return res.json(users);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.id).select("-password");
      if (!user)
        return res.status(400).json({message: "User does not exists."});
      return res.json(user);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateUser: async (req, res) => {
    try {
      const {active, role, id} = req.body;
      if (!id || !role || !active) {
        return res.status(400).json({message: "All fields are required."});
      }
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(400).json({message: "User not found."});
      }
      user.active = active;
      user.role = role;
      await user.save();
      return res.json({message: "User status updated."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getDashboard: async (req, res) => {
    try {
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
  },
};

module.exports = userCtrl;
