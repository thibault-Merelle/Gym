import express, {Request, Response, NextFunction} from "express"
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const memeRoutes = require("./routes/meme.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
require("dotenv").config({ path: "./config/.env" });
import jwt from "jsonwebtoken"


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

// jwt 
app.get('*', checkUser); // l'etoile nous permet de selectionner toutes les routes et ainsi de faire la verification sur chaque route
app.get('/jwtid', requireAuth)

// routes
app.use("/api/user", userRoutes);
app.use("/api/meme", memeRoutes);


// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});