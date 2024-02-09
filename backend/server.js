require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const connectDB = require("./lib/connectDb");
const corsOptions = require("./lib/corsOptions");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/api", (req, res) => {
  return res.json({message: "E-Commerce Website MERN API!"});
});

app.use("/api", require("./router/authRouter"));
app.use("/api", require("./router/userRouter"));
app.use("/api", require("./router/bookingRouter"));
app.use("/api", require("./router/hotelRouter"));
app.use("/api", require("./router/ratingRouter"));
app.use("/api", require("./router/categoryRouter"));
app.use("/api", require("./router/paymentRouter"));

mongoose.connection.once("open", () => {
  console.log("database connection successful.");
  app.listen(PORT, () => {
    console.log(`Application listening on http://localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
