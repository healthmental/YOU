const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const user = require("./models/user");
const doctor = require("./models/doctor");
const image = require("./models/image");
const review = require("./models/review");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const reviewRouter = require("./routes/reviewRoutes");

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
app.use(reviewRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

let mongoUrl =
  "mongodb+srv://alaaeldin:projectteam8@cluster0.ydnex.mongodb.net/therapy-app?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl)
  .then((result) => {
    app.listen(PORT, console.log(`Server started on port${PORT}`));
  })
  .catch((err) => console.log(err));
