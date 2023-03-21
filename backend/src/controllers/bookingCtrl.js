const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const getUserBooking = async (req, res) => {
  try {
    const booking = await Booking.find({user: req.id})
      .populate("user", "_id username email mobileNumber image")
      .populate("hotel", "title _id");
    if (!booking)
      return res.status(400).json({msg: "This booking does not exists."});
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

// incomplete
const getBookings = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const bookings = await Booking.find()
      .populate("user", "_id username email mobileNumber image")
      .populate("hotel");
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

const createBooking = async (req, res) => {
  try {
    const {user, hotel, price, startDate, endDate, paymentResult} = req.body;
    const newBooking = new Booking({
      user,
      hotel,
      price,
      startDate,
      endDate,
      paymentResult,
    });
    await newBooking.save();
    return res.json({msg: "Booking confirmed."});
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "_id username email mobileNumber image")
      .populate("hotel", "title _id");
    if (!booking)
      return res.status(400).json({msg: "This booking does not exists."});
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

const updateBooking = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const {status, isPaid} = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {status, isPaid},
      {new: true}
    );
    if (!booking)
      return res.status(400).json({msg: "Booking does not exists."});
    return res.status(400).json(booking);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

const deleteBooking = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    await Booking.findByIdAndDelete(req.params.id);
    return res.json({msg: "Booking deleted."});
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

const getHotelBooking = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const booking = await Booking.find({hotel: req.params.hotel})
      .populate("user", "_id username email mobileNumber image")
      .populate("hotel");
    if (!booking)
      return res.status(400).json({msg: "This booking does not exists."});
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({msg: error.message});
  }
};

module.exports = {
  getBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
  getUserBooking,
  getHotelBooking,
};
