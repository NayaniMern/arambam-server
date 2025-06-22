const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  image: String,
  image1: String,

  title: String,
  author: String,
  date: String,
   category: String,
      rating: String,
      quote: String,
      readingtime: String,
      shortdes: String,
      longdes1: String,
      longdes2: String,
      content: String,
      tags: String
});

module.exports = mongoose.model("blogs", BlogSchema);
