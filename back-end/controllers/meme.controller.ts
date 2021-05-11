import {MongoClient} from "mongodb"
var url =
  "mongodb://gymtestmongo:cPOnJAfPYNZqhO10UqZzAS4fZapkAnAk3PugWbs2iRBnp6yZf498eRoEkQPS7amuAO11DABq1E80KCuHZcgNIQ==@gymtestmongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@gymtestmongo@";
import jwt from "jsonwebtoken"


module.exports.readMeme = (req, res) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo
        .collection("test")
        .find({}).limit(4)
        .toArray(function (err, result) {
          if (err) throw err;
          res.send(result);
          console.log(result);
          db.close();
        });
    });
};

module.exports.deleteMeme = async (req, res) => {
  const { id } = req.body;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("test")
      .deleteOne({ _id : id})
      res.send("ok")
  });
};

module.exports.categorieMeme = async (req, res) => {
  const { category } = req.body;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("test")
      .find({ category: category })
      .limit(4)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log(result);
        db.close();
      });
  });
};

module.exports.searchMeme = async (req, res) => {
  const { search } = req.body;
  
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("test")
      .find({ name: search })
      .toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0){
          res.send(result);
        }
        else{
          res.send("Aucun resultat pour cette recherche")
        }
        
        console.log(result);
        db.close();
      });
  });
};

module.exports.addForm = async (req, res) => {
  const {name, category, urlMeme} = req.body
  const extension = urlMeme.split("\\")
  const token = req.cookies.jwt;
  let idLogin = ""

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      idLogin = decodedToken.id
      console.log(decodedToken.id);
      
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
        url: `https://gymteststorageaccount.blob.core.windows.net/meme-storage/${extension[2]}` ,
      },
    ];
    dbo.collection("test").insertMany(myobj, function (err, result) {
      if (err) throw err;
      console.log("Number of documents inserted: " + result.insertedCount);
      res.send("insert ok");
      db.close();
    });
  });
}

module.exports.profilMeme = async (req, res) => {
  const token = req.cookies.jwt;
  let idLogin = "";

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err);
    } else {
      idLogin = decodedToken.id;
      console.log(decodedToken.id);
      // res.send("ok");
    }
  });

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("test")
      .find({ idLogin: idLogin }).limit(4).skip(0)
      .toArray(function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("Vous n'avez ajoutez aucun meme sur notre site");
        }

        console.log(result);
        db.close();
      });
  });
};

