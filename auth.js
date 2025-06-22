const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const token = req.header("x-token");
      if (!token) return res.status(401).send({ Message: "Access Denied. No Token Provided." });

      const decoded = jwt.verify(token, "jsonSecret")
      req.user = decoded.user
      next();
  
}
module.exports = auth;