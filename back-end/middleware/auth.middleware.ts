export {};
import jwt from "jsonwebtoken";


module.exports.checkUser = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("authentification ok");
    next();
  } catch (err) {
    console.log("authentification fail");
    res.send("token fail");
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.id);
        res.send("ok");
        next();
      }
    });
  } else {
    console.log("No token");
    res.send("veuillez vous logger");
  }
};
