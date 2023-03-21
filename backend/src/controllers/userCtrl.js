const User = require("../models/userModel");

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(400).json({message: "user does not exists."});
    return res.json(user);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

// incomplete
const getAllUsers = async (req, res) => {
  try {
    if (!req.roles === "admin") {
      return res
        .status(400)
        .json({message: "only admin access all user information."});
    }
    const users = await User.find().select("-password").lean();
    if (!users?.length) {
      return res.status(400).json({message: "no users found."});
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      image,
      dob,
      gender,
      city,
      state,
      country,
      zip,
      addressline1,
      addressline2,
    } = req.body;
    const errors = [];
    for (const key in req.body) {
      if (!req.body[key]) {
        errors.push(`Please fill ${key} field.`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({message: errors});
    }
    const getUsername = await User.findById(req.params.id);
    if (getUsername.username != username) {
      const matchUsername = await User.findOne({username});
      if (matchUsername) {
        return res
          .status(400)
          .json({message: "This username already register, try another one."});
      }
    }
    if (getUsername.username !== req.user) {
      return res
        .status(400)
        .json({message: "only the user can update his/her profile."});
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username.toLowerCase(),
      image,
      dob,
      gender: gender.toLowerCase(),
      city: city.toLowerCase(),
      country: country.toLowerCase(),
      state: state.toLowerCase(),
      zip,
      addressline1,
      addressline2,
    });
    if (!user) {
      return res.status(400).json({message: "User does not exists."});
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.roles == "user") {
      return res
        .status(400)
        .json({message: "only admin can delete user account."});
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(400).json({message: "user does not exists."});
    res.json({message: "user deleted."});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
