const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const user = require("./models/user");
const image = require("./models/image");
const review = require("./models/review");

const verifyRouter = require("./routes/verify");
const articleRouter = require("./routes/article");
const doctorRouter = require("./routes/doctor");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const reviewRouter = require("./routes/review");
const calenderRouter = require("./routes/calender");
const reservationRouter = require("./routes/reservation");
const reportRouter = require("./routes/report");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
// app.use(morgan("dev"));

// serve images in directory images
app.use("/images", express.static(path.join(__dirname, "images")));

//CORS set
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , PUT , PATCH , DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

app.use("/auth", authRouter);
app.use(profileRouter);
app.use(doctorRouter);
app.use(verifyRouter);
app.use(articleRouter);
app.use(reviewRouter);
app.use(calenderRouter);
app.use(reservationRouter);
app.use(reportRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// console.log(process.env);

const mongoURL =
  process.env.ENVIRONMENT === "local"
    ? "mongodb://127.0.0.1:27017"
    : `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ydnex.mongodb.net/therapy-app?retryWrites=true&w=majority`;

// mongoose.connection.db.dropDatabase(function (err, result) {
//   if (err) console.log(err);
//   else console.log("Dropped database successfully");
// });

mongoose
  .connect(mongoURL)
  .then((result) => {
    // mongoose.connection.db.dropDatabase();
    app.listen(PORT, console.log(`Server started on port${PORT}`));
  })
  .catch((err) => console.log(err));
