const Booking = require("../models/bookingModel");

const bookingCtrl = {
  getUserBooking: async (req, res) => {
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
  },
  updateBooking: async (req, res) => {
    try {
      const {status, isPaid, id} = req.body;
      const booking = await Booking.findById(id).exec();
      if (!booking) {
        return res.status(400).json({message: "Booking not found."});
      }
      booking.status = status;
      booking.isPaid = isPaid;
      await booking.save();
      return res.json({message: "Booking updated successful."});
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  getBookings: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user", "_id username email mobileNumber image")
        .populate("hotel", "title _id");
      return res.json(bookings);
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
  getHotelBooking: async (req, res) => {
    try {
      const booking = await Booking.find({hotel: req.params.hotel}).populate(
        "user",
        "_id username email mobileNumber image"
      );
      if (!booking)
        return res.status(400).json({msg: "This booking does not exists."});
      return res.json(booking);
    } catch (error) {
      return res.status(500).json({msg: error.message});
    }
  },
};

module.exports = bookingCtrl;
