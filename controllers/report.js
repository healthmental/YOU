const Report = require("../models/report");
const User = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    const condition = req.body.condition;
    const plan = req.body.plan;
    const progress = req.body.progress;
    const activities = req.body.activities;
    const sessionType = req.body.sessionType;
    const doctorId = req.userId;
    const doctor = await User.findById(doctorId, { name: 1, profession: 1 });

    const report = new Report({
      condition,
      plan,
      progress,
      activities,
      sessionType,
      doctor,
      createdAt: new Date().toISOString(),
    });

    const result = await report.save();

    console.log(`Report created with id ${result._id}`);
    return res.status(201).json({ message: "Report created!", id: result._id });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
