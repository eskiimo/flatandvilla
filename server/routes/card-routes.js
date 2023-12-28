const express = require("express");
const card_controllers = require("../controllers/cards-controller");

const router = express.Router();

router.get("/", card_controllers.getAllCards);
router.get("/:id", card_controllers.getCardById);
router.post("/new", card_controllers.createCard);
router.post("/cardsbyid", card_controllers.getCardsbyIds);
router.post("/move", card_controllers.move);
router.delete("/:id", card_controllers.deleteCard);

module.exports = router