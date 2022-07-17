const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
  collection: "reports", // the name of our collection
};
const reports = new Schema(
  {
    doctor: { type: Schema.Types.Mixed },
    condition: { type: String },
    plan: { type: String },
    progress: { type: String },
    activities: { type: String },
    sessionType: { type: String },
    createdAt: { type: Date },
  },
  baseOptions
);

module.exports = mongoose.model("Report", reports);
