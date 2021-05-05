const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

const mydb : string = `mongodb://localhost:27017`;

mongoose
  .connect(
    mydb,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.log("Failed to connect to Mongodb", err));
