var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var userRoutes = require("./routes/user.routes");
var memeRoutes = require("./routes/meme.routes");
require("dotenv").config({ path: "./config/.env" });
var corsOptions = {
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use(cors(corsOptions));
// bodyParser va nous permettre de mettre en forme les requetes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
app.use("/api/user", userRoutes);
app.use("/api/meme", memeRoutes);
// server
app.listen(process.env.PORT, function () {
    console.log("Listenning on port " + process.env.PORT);
});
