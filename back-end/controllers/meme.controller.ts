var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require("mongodb").ObjectID;
var url =
  "mongodb://gymtestmongo:cPOnJAfPYNZqhO10UqZzAS4fZapkAnAk3PugWbs2iRBnp6yZf498eRoEkQPS7amuAO11DABq1E80KCuHZcgNIQ==@gymtestmongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gymtestmongo@";

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


// app.get("/find", (req, res) => {

// });
