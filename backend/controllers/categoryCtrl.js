const Category = require("../models/categoryModel");
const Hotel = require("../models/hotelModel");

const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  createCategory: async (req, res) => {
    try {
      const {name, image} = req.body;
      if (!name || !image) {
        return res.status(400).json({message: "Please fill all fields."});
      }
      const category = await Category.findOne({name});
      if (category)
        return res
          .status(400)
          .json({message: "This category already created."});
      const newCategory = new Category({
        name: name.toLowerCase(),
        image,
      });
      await newCategory.save();
      return res.json({message: "Category created."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {id, name, image} = req.body;
      if (!id || !name || !image) {
        return res.status(400).json({message: "All fields are required."});
      }
      const category = await Category.findById(id).exec();
      if (!category) {
        return res.status(400).json({message: "Category not found."});
      }
      category.name = name;
      category.image = image;
      await category.save();
      return res.status(200).json({message: "Category updated successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const hotels = await Hotel.findOne({category: req.params.id});
      if (hotels)
        return res
          .status(400)
          .json({message: "Please delete all hotel of this category first."});
      await Category.findByIdAndDelete(req.params.id);
      return res.json({message: "Category deleted."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
};

module.exports = categoryCtrl;
