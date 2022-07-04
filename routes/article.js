const express = require("express");
const article = require("../controllers/article");
const isAuth = require("../middleware/is-auth");
const multerConfig = require("../config/multer");

const router = express.Router();

router.post("/articles", isAuth, multerConfig.single("cover"), article.create);
router.get("/articles", article.getAll);

module.exports = router;
