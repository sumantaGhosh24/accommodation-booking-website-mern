const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const authCtrl = {
  register: async (req, res) => {
    try {
      const {
        email,
        mobileNumber,
        password,
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
          errors.push(`Please Fill ${key} Field.`);
        }
      }
      if (errors.length > 0) {
        return res.status(400).json({message: errors});
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return res.status(400).json({message: "Please Enter a Valid Email."});
      }
      if (!mobileNumber.match(/^\d{10}$/)) {
        return res
          .status(400)
          .json({message: "Please Enter a Valid Mobile Number."});
      }
      const userEmail = await User.findOne({email});
      if (userEmail) {
        return res.status(400).json({message: "This Email Already Register."});
      }
      const userMobileNumber = await User.findOne({mobileNumber});
      if (userMobileNumber) {
        return res
          .status(400)
          .json({message: "This Mobile Number Already Register."});
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({message: "Password Length must be 6 Character Long."});
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        mobileNumber,
        password: passwordHash,
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
      await newUser.save();
      return res.status(201).json({message: "User registration successful."});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      if (!email || !password) {
        return res.status(400).json({message: "All fields are required."});
      }
      const foundUser = await User.findOne({email}).exec();
      if (!foundUser || !foundUser.active) {
        return res.status(401).json({message: "Unauthorized"});
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) return res.status(401).json({message: "Unauthorized"});
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            role: foundUser.role,
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
      );
      const refreshToken = jwt.sign(
        {email: foundUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "7d"}
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({accessToken});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  refresh_token: (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.status(401).json({message: "Unauthorized"});
      const refreshToken = cookies.jwt;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return res.status(403).json({message: "Forbidden"});
          const foundUser = await User.findOne({
            email: decoded.email,
          }).exec();
          if (!foundUser)
            return res.status(401).json({message: "Unauthorized"});
          const accessToken = jwt.sign(
            {
              UserInfo: {
                email: foundUser.email,
                role: foundUser.role,
                id: foundUser._id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
          );
          res.json({accessToken});
        }
      );
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
  },
  logout: (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt", {httpOnly: true, sameSite: "None", secure: true});
    res.json({message: "Cookie cleared"});
  },
};

module.exports = authCtrl;
