const Hotel = require("../models/hotelModel");
const Rating = require("../models/ratingModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = {...this.queryString};
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const hotelCtrl = {
  getPaginationHotels: async (req, res) => {
    try {
      const features = new APIfeatures(
        Hotel.find()
          .populate("owner", "_id username email mobileNumber image")
          .populate("category"),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();
      const hotels = await features.query;
      return res.json(hotels);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  getHotels: async (req, res) => {
    try {
      const hotels = await Hotel.find()
        .populate("owner", "_id username email mobileNumber image")
        .populate("category");
      return res.status(200).json(hotels);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createHotel: async (req, res) => {
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
      return res.status(200).json({message: "New hotel created successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateHotel: async (req, res) => {
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
        id,
      } = req.body;
      const hotel = await Hotel.findById(id).exec();
      if (!hotel) {
        return res.status(400).json({message: "Hotel not found."});
      }
      hotel.title = title;
      hotel.description = description;
      hotel.content = content;
      hotel.price = price;
      hotel.country = country;
      hotel.city = city;
      hotel.zip = zip;
      hotel.address = address;
      hotel.latitude = latitude;
      hotel.longitude = longitude;
      hotel.state = state;
      await hotel.save();
      return res.status(200).json({message: "Hotel update successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteHotel: async (req, res) => {
    try {
      const hotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!hotel)
        return res.status(400).json({message: "This hotel does not exists."});
      return res.status(200).json({message: "Hotel deleted successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = hotelCtrl;
