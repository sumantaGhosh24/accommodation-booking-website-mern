const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dzqgzsnoc/image/upload/v1661089281/e-commerce-api-men/z3c01tgtolouzyvccvmj.jpg",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zip: {
      type: String,
      trim: true,
    },
    addressline1: {
      type: String,
      trim: true,
    },
    addressline2: {
      type: String,
      trim: true,
    },
    active: {
      type: String,
      default: "active",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
