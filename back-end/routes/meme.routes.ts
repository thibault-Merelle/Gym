export {}; // pour eviter l'erreur : Cannot redeclare block-scoped variable 'router'
const router = require("express").Router();
const memeController = require("../controllers/meme.controller");

router.post("/form", memeController.addForm);
router.get("/read", memeController.readMeme);
router.get("/id", memeController.deleteMeme);
router.post("/category", memeController.categorieMeme);
router.get("/search", memeController.searchMeme);
router.get("/profil", memeController.profilMeme);


module.exports = router;
