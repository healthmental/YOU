const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  collection: "articles", // the name of our collection
};
const articles = new Schema(
  {
    title: { type: String },
    content: { type: String },
    category: { type: String },
    cover: { type: String },
    createdAt: { type: Date },
    doctor: { type: Schema.Types.Mixed },
  },
  baseOptions
);

module.exports = mongoose.model("Article", articles);
