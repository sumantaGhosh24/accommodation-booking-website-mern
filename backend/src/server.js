require("dotenv").config();
// require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const {logger, logEvents} = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/bookingRouter"));
app.use("/api", require("./routers/hotelRouter"));
app.use("/api", require("./routers/ratingRouter"));
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/paymentRouter"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("database connection successful.");
  app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
