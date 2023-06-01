require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Booking = require("../models/bookingModel");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentCtrl = {
  getRazorpay: async (req, res) => {
    try {
      const options = {
        amount: Number(req.body.price * 100),
        currency: "INR",
      };
      const order = await instance.orders.create(options);

      if (!order) return res.status(500).json({message: "server error"});
      return res.json(order);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  verification: async (req, res) => {
    try {
      const {
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        hotel,
        price,
        startDate,
        endDate,
      } = req.body;
      const user = req.id;

      const shasum = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      );

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      if (digest !== razorpaySignature)
        return res.status(400).json({msg: "Transaction not legit!"});

      const newBooking = new Booking({
        user: user,
        hotel: hotel,
        paymentResult: {
          id: orderCreationId,
          status: "success",
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
          razorpay_signature: razorpaySignature,
        },
        startDate: startDate,
        endDate: endDate,
        price: price,
        status: "pending",
        isPaid: true,
      });
      await newBooking.save();

      res.json({
        msg: "success",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = paymentCtrl;
