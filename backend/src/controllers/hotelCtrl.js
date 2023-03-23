const Hotel = require("../models/hotelModel");
const Rating = require("../models/ratingModel");
const APIFeatures = require("../lib/index");

const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find()
      .populate("owner", "_id firstName lastName username email image")
      .populate("category", "_id name image");
    return res.json({hotels});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getHotels = async (req, res) => {
  try {
    const features = new APIFeatures(
      Hotel.find()
        .populate("owner", "_id firstName lastName username email image")
        .populate("category", "_id name image"),
      req.query
    )
      .paginating()
      .sorting()
      .searching()
      .filtering();
    const result = await Promise.allSettled([
      features.query,
      Hotel.countDocuments(),
    ]);
    const hotels = result[0].status === "fulfilled" ? result[0].value : [];
    return res.status(200).json({hotels});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate("owner", "_id username email mobileNumber image")
      .populate("category");
    if (!hotel)
      return res.status(400).json({message: "This hotel does not exists."});
    const rating = await Rating.find({hotel: req.params.id}).populate(
      "user",
      "username email image"
    );
    return res.status(200).json({hotel, rating});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const createHotel = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const {
      title,
      description,
      content,
      images,
      category,
      price,
      country,
      city,
      zip,
      address,
      latitude,
      longitude,
      state,
    } = req.body;
    const owner = req.id;
    const errors = [];
    for (const key in req.body) {
      if (!req.body[key]) {
        errors.push(`Please fill ${key} field.`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({message: errors});
    }
    const newHotel = new Hotel({
      owner: owner,
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      content: content.toLowerCase(),
      images,
      category,
      price,
      country,
      city,
      zip,
      address,
      latitude,
      longitude,
      state,
    });
    await newHotel.save();
    return res.status(200).json({message: "new hotel created successful."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateHotel = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const {
      title,
      description,
      content,
      price,
      country,
      city,
      zip,
      address,
      latitude,
      longitude,
      state,
    } = req.body;
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        price,
        country,
        city,
        zip,
        address,
        latitude,
        longitude,
        state,
      },
      {new: true}
    );
    if (!hotel)
      return res.status(400).json({message: "This hotel does not exists."});
    return res.status(200).json({message: "hotel update successful."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteHotel = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel)
      return res.status(400).json({message: "this hotel does not exists."});
    return res.status(200).json({message: "Hotel deleted successful."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getAllHotels,
  getHotels,
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
};
