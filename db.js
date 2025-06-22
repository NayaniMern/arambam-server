const mongoose = require("mongoose");
const dburl = "mongodb+srv://sivatrinayaniv:Nayani123@mernprojects.rkj70h9.mongodb.net/arambam?retryWrites=true&w=majority&appName=MernProjects";

mongoose
  .connect(dburl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));
