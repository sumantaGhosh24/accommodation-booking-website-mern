const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    hotel: {type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true},
    comment: {type: String, required: true},
    rating: {type: Number, required: true},
  },
  {timestamps: true}
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
