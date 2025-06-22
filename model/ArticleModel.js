const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phonenumber: String,
  articleTitle: String,
  category: String,
  article: String,
  authorBio: String,
});

module.exports = mongoose.model("articles", ArticleSchema);
