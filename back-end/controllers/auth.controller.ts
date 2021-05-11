// const { signUpErrors, signInErrors } = require("../utils/errors.utils");
import jwt from "jsonwebtoken"
const maxAge = 3 * 24 * 60 * 60 * 1000; // la variable qui permet de faire expirer une session
import {MongoClient, ObjectID} from "mongodb";
const url =
  "mongodb://gymtestmongo:cPOnJAfPYNZqhO10UqZzAS4fZapkAnAk3PugWbs2iRBnp6yZf498eRoEkQPS7amuAO11DABq1E80KCuHZcgNIQ==@gymtestmongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gymtestmongo@";
import bcrypt from "bcrypt"
const saltRounds = 10;


const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  let passHash;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      passHash = hash;
    });
  });

  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = {
        pseudo: pseudo,
        email: email,
        password: passHash,
      };
      dbo.collection("user").insertOne(myobj, (err, result) => {
        res.status(201).json({ user: result.insertedId });
      });
    });
  } catch (err) {
    //   const errors = signUpErrors(err);
    res.status(200).send(err);
  }
};

module.exports.signIn = (req, res) => {
  const { pseudo, password } = req.body;
  let id;
  let pass;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("user").findOne({ pseudo }, async function (err, result) {
      if (err) throw err;
      console.log(result);
      pass = result.password;
      console.log(pass);
      const auth = await bcrypt.compare(password, pass);
      if (auth) {
        id = result._id;
        const token = createToken(id);
        res.cookie("jwt", token, { httpOnly: true, maxAge });
        res.send("ok");
      } else {
        console.log("Password invalid");
        res.send("fail");
      }
      db.close();
    });
  });
};

module.exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // pour logOut le user on va juste vider le cookie de son token
  res.redirect("/");
};
