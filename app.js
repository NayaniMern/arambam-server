require("./db");
const express = require("express");
const app = express();
const cors = require("cors");
const Enquiry = require("./model/EnquiryModel");
const Blog = require("./model/BlogModel");
const User = require("./model/UserModel");
const Article = require("./model/ArticleModel");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
app.use(cors());
app.use(express.json());

/*SignUp*/
app.post("/signup", async (req, res) => {
  const { email, password, confirmpassword } = req.body;
  let exist = await User.findOne({ email: email });
  //Already exists
  if (exist) {
    return res.status(400).json({ Message: "Email Already Exist" });
  }
  //Password confirmation
  if (password !== confirmpassword) {
    return res
      .status(400)
      .json({ Message: "Password and Confirm Password doesn't Match" });
  }
  const signup = new User(req.body);
  const result = await signup.save();
  res.json({ Message: "Signup Successfull", result: result });
});

/*Login*/

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email: email });
  if (!exists) {
    return res.status(400).json({ Message: "Email doesn't Exist" });
  }
  //Password Match

  if (exists.password !== password) {
    return res.status(400).json({ Message: "Password doesn't Exist" });
  }
  /* res.json({ Message :"Login Successfull"}) */

  //PayLoad

  const payload = {
    user: {
      id: exists._id,
    },
  };
  //JWT Creation
  const token = jwt.sign(payload, "jsonSecret", { expiresIn: "1h" });
  res.json({ Message: "Login Successfull", token: token });
});
/*Protected Route*/
app.get("/dashboard" , auth , async (req,res) => {
  const exists = await User.findOne({_id: req.user.id})
  if (!exists) {
    return res.status(400).json({ Message: "You are Not Authorized" })
  }
  else{
    res.json(exists)
  }
  
}) 


/*Blogs*/

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.send(result);
});

// Always keep this first - fetch all blogs
app.get("/blogs/all", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) {
    res.send(blogs);
  } else {
    res.send("No Blogs data Found");
  }
});

// Get blogs by category and limit
app.get("/blogs", async (req, res) => {
  try {
    const limit = parseInt(req.query._limit) || 0;
    const category = req.query.category;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const blogs = await Blog.find(filter).limit(limit);
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});





app.get("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.findOne({ _id: _id });
  res.send(blog);
});

app.put("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.updateOne({ _id: _id }, { $set: req.body });
  res.send(blog);
});

app.delete("/blogs/:_id", async (req, res) => {
  const _id = req.params._id;
  const blog = await Blog.deleteOne({ _id: _id });
  res.send(blog);
});

/*Enquiries*/
app.post("/enquiries", async (req, res) => {
  const enquiry = new Enquiry(req.body);
  const result = await enquiry.save();
  res.send(result);
});

app.get("/enquiries", async (req, res) => {
  const enquiries = await Enquiry.find();
  if (enquiries.length > 0) {
    res.send(enquiries);
  } else {
    res.send("No Enquiries Found");
  }
});

app.get("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.findOne({ _id: _id });
  res.send(enquiry);
});

app.put("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.updateOne({ _id: _id }, { $set: req.body });
  res.send(enquiry);
});

app.delete("/enquiries/:_id", async (req, res) => {
  const _id = req.params._id;
  const enquiry = await Enquiry.deleteOne({ _id: _id });
  res.send(enquiry);
});

/* Articles Routes */

app.post("/articles", async (req, res) => {
  const article = new Article(req.body);
  const result = await article.save();
  res.send(result);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.send(articles); // ✅ Always return an array
});

app.get("/articles/:_id", async (req, res) => {
  const _id = req.params._id;
  const article = await Article.findOne({ _id: _id });
  res.send(article);
});

app.put("/articles/:_id", async (req, res) => {
  const _id = req.params._id;
  const article = await Article.updateOne({ _id: _id }, { $set: req.body });
  res.send(article);
});

app.delete("/articles/:_id", async (req, res) => {
  const _id = req.params._id;
  const article = await Article.deleteOne({ _id: _id });
  res.send(article);
});




app.listen(5000, () => console.log("API STARTED"));