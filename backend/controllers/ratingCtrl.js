const Rating = require("../models/ratingModel");

const ratingCtrl = {
  getAllRatings: async (req, res) => {
    try {
      const ratings = await Rating.find()
        .populate("hotel", "title _id")
        .populate("user", "username email image");
      if (!ratings) return res.status(400).json({message: "No rating exists."});
      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getRatings: async (req, res) => {
    try {
      const ratings = await Rating.find({hotel: req.params.hotel}).populate(
        "user",
        "username email image"
      );
      if (!ratings) return res.status(400).json({message: "No rating exists."});
      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getMyRatings: async (req, res) => {
    try {
      const ratings = await Rating.find({user: req.id})
        .populate("user", "username email image")
        .populate("hotel", "title image");
      if (!ratings) {
        return res.status(400).json({message: "No rating exists."});
      }
      return res.status(200).json(ratings);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createRating: async (req, res) => {
    try {
      const {comment, rating} = req.body;
      const hotel = req.params.hotel;
      const user = req.id;
      const errors = [];
      for (const key in req.body) {
        if (!req.body[key]) {
          errors.push(`Please fill ${key} field.`);
        }
      }
      if (errors.length > 0) return res.status(400).json({message: errors});
      const newRating = new Rating({
        hotel,
        user,
        comment: comment.toLowerCase(),
        rating: Number(rating),
      });
      await newRating.save();
      return res.status(200).json({message: "Rating created successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = ratingCtrl;
