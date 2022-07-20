const Report = require("../models/report");
const User = require("../models/user");
const { CustomError } = require("../utils/error");

exports.create = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const doctorId = req.userId;

    // Don't allow the doctor to post a report on himself.
    if (doctorId === userId) throw new CustomError(400, "You cannot report yourself :D");

    const doctor = await User.findById(doctorId, { name: 1, profession: 1 });
    const report = new Report({
      condition: req.body.condition,
      plan: req.body.plan,
      progress: req.body.progress,
      activities: req.body.activities,
      sessionType: req.body.sessionType,
      doctor,
      userId: req.userId,
      createdAt: new Date().toISOString(),
    });

    const result = await report.save();
    console.log(`Report created with id ${result._id}`);
    return res.status(201).json({ message: "Report added successfully!", id: result._id });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getReport = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const report = await Report.find({ userId });

    res.status(200).json({ report });
  } catch (err) {
    next(err);
  }
};
