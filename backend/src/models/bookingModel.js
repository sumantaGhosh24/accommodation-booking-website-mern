const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {timestamps: true}
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
