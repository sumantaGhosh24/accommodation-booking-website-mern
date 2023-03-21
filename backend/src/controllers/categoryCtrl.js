const Category = require("../models/categoryModel");
const Hotel = require("../models/hotelModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json({categories});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// incomplete
const createCategory = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const {name, image} = req.body;
    const category = await Category.findOne({name});
    if (category)
      return res.status(400).json({message: "This category already created."});
    const newCategory = new Category({
      name: name.toLowerCase(),
      image,
    });
    await newCategory.save();
    return res.json({message: "Category created."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteCategory = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const hotels = await Hotel.findOne({category: req.params.id});
    if (hotels)
      return res
        .status(400)
        .json({message: "Please delete all hotel of this category first"});
    await Category.findByIdAndDelete(req.params.id);
    return res.json({message: "Category deleted."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateCategory = async (req, res) => {
  if (!req.roles === "admin") {
    return res
      .status(400)
      .json({message: "only admin can access this routes."});
  }
  try {
    const {name, image} = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {name: name.toLowerCase(), image},
      {new: true}
    );
    if (!category)
      return res.status(400).json({message: "This category does not exists."});
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
