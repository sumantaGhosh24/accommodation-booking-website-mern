const Rating = require("../models/ratingModel");

const getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({user: req.params.user}).populate(
      "hotel",
      "title _id"
    );
    if (!ratings) return res.status(400).json({message: "No review exists."});
    return res.status(200).json({ratings});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getHotelRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({hotel: req.params.hotel}).populate(
      "user"
    );
    if (!ratings) return res.status(400).json({message: "No review exists."});
    return res.status(200).json({ratings});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getSingleRating = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id).populate(
      "hotel",
      "title _id"
    );
    return res.json(rating);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateRating = async (req, res) => {
  try {
    const {comment, rating} = req.body;
    if (!comment || !rating) {
      return res.status(400).json({message: "please fill all fields."});
    }
    const updateRating = await Rating.findByIdAndUpdate(
      req.params.id,
      {comment: comment.toLowerCase(), rating},
      {new: true}
    );
    if (!updateRating) {
      return res.status(400).json({message: "this rating does not exists."});
    }
    return res.json({message: "rating updated successful."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    return res.json({message: "Rating deleted"});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .populate("user", "username email")
      .populate("hotel", "title _id");
    if (!ratings) return res.status(400).json({message: "No review exists."});
    return res.status(200).json(ratings);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const createRating = async (req, res) => {
  try {
    const {comment, rating} = req.body;
    const hotel = req.params.hotel;
    const user = req.user.id;
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
    return res.status(200).json(newRating);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getRatings,
  getHotelRatings,
  getUserRatings,
  createRating,
  getSingleRating,
  updateRating,
  deleteRating,
};
