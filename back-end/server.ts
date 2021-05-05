const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const memeRoutes = require("./routes/meme.routes");
require("dotenv").config({ path: "./config/.env" });


const corsOptions = {
  origin: [process.env.CLIENT_URL, "http://localhost:3000"],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// bodyParser va nous permettre de mettre en forme les requetes 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


// routes
app.use("/api/user", userRoutes);
app.use("/api/meme", memeRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});