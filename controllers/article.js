const Article = require("../models/article");
const User = require("../models/user");
// POST /doctors/:doctorId/articles

exports.create = async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const cover = req.file.path;
    const doctorId = req.userId;
    const doctor = await User.findById(doctorId, { name: 1, image: 1 });

    const article = new Article({
      title,
      content,
      category,
      cover,
      doctor,
      createdAt: new Date().toISOString(),
    });

    const result = await article.save();

    console.log(`Article created with id ${result._id}`);
    return res.status(201).json({ message: "Article created!", id: result._id });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const articles = await Article.find();

    res.status(200).json({ articles });
  } catch (err) {
    next(err);
  }
};
