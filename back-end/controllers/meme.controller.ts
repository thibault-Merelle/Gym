import {MongoClient} from "mongodb"
var url =
  "mongodb://gymtestmongo:cPOnJAfPYNZqhO10UqZzAS4fZapkAnAk3PugWbs2iRBnp6yZf498eRoEkQPS7amuAO11DABq1E80KCuHZcgNIQ==@gymtestmongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gymtestmongo@";
import jwt from "jsonwebtoken"


module.exports.addMeme = (req, res) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = [
        {
          name: "meme1",
          url:
            "https://gymteststorageaccount.blob.core.windows.net/meme-storage/simplon.png",
        },
      ];
      dbo.collection("test").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
      res.send(`${myobj[0].name} is add`)
    });
};

module.exports.readMeme = (req, res) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo
        .collection("test")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          res.send(result);
          console.log(result);
          db.close();
        });
    });
};

module.exports.deleteMeme = async (req, res) => {};

module.exports.categorieMeme = async (req, res) => {};

module.exports.searchMeme = async (req, res) => {};

module.exports.addForm = async (req, res) => {
  const {name, category, urlMeme} = req.body
  const token = req.cookies.jwt;
  let idLogin = ""

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      idLogin = decodedToken.id
      console.log(decodedToken.id);
      res.send("ok");
    }
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = [
      {
        idLogin : idLogin,
        name: name,
        category : category,
        url: urlMeme,
      },
    ];
    dbo.collection("test").insertMany(myobj, function (err, result) {
      if (err) throw err;
      console.log("Number of documents inserted: " + result.insertedCount);
      db.close();
    });
  });
}

