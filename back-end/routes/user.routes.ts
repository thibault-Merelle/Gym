export {}; // pour eviter l'erreur : Cannot redeclare block-scoped variable 'router'
const router = require("express").Router();
const authController = require("../controllers/auth.controller");

// auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

module.exports = router;
