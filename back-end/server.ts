import express, {Request, Response, NextFunction} from "express"
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const memeRoutes = require("./routes/meme.routes");
require("dotenv").config({ path: "./config/.env" });
import { Console } from "console";
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


// routes
app.use("/api/user", userRoutes);
app.use("/api/meme", memeRoutes);

const users = [
  { id: 1, name: "Marwa", mail: "marwa@simplon.com", password: "123454321" },
  { id: 2, name: "Alex", mail: "mskzia@gmail.com", password: "1234RJKDGS" },
  {
    id: 3,
    name: "Max",
    mail: "mskzifhahfLIa@gmail.com",
    password: "1234Ry!§JKDGS",
  },
  {
    id: 4,
    name: "Bron",
    mail: "mskJHDKUGLDNzia@gmail.com",
    password: "123JHDIUYACO4RJKDGS",
  },
];

const usersMapped = users.map((user)=>{
  return {id : user.id, name : user.name}
})

const key_jwt = "shhhhh";

//login
app.post("/login", (req, res) => {
  const {mail, password} = req.body
  for(let i = 0; i < users.length; i++){
    let user = users[i]
    if (user.mail == mail) {
      if (user.password == password){
        const token = jwt.sign({id : user.id}, key_jwt);
        res.send(token)
      }else {
        res.send("mauvais password")
      }
      return
    }
  }
  console.log(mail, password)

  res.send("mauvais user")
})

const authentification = (req : Request, res : Response, next: NextFunction)=>{
  try {
    const token = req.query.token as string;
    var decoded = jwt.verify(token, key_jwt);
    console.log("ok")
    // res.send("token ok")
    next()
  }catch(err){
    console.log(err)
    res.send("token fail")
  }
}

app.get("/profil", authentification,(req, res) =>{
  console.log("profil")
  res.send("profil")
})
app.post("/privee", authentification, (req, res) =>{
  console.log("privee")
  res.send("privee")
})


// server
app.listen(process.env.PORT, () => {
  console.log(`Listenning on port ${process.env.PORT}`);
});