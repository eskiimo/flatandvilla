const Card = require("../models/card-model");
const Column = require("../models/column-model");
const mongoose = require("mongoose");

const getAllCards = async (req, res, next) => {
  let cards;
  try {
    cards = await Card.find();
  } catch (e) {
    res.status(500).json({ message: "something went wrong, try again.." });
  }
  res.status(200).json({ cards });
};

const getCardById = async (req, res, next) => {
  const id = req.params.id;
  let card;
  try {
    card = await Card.find({ id: id });
  } catch (e) {
    res.status(500).json({ message: "something went wrong, try again.." });
  }

  res.status(200).json({ card });
};

const getCardsbyIds = async (req, res, next) => {
  const list = req.body.list;
  // console.log("list", req.body.list);
  let cards;
  try {
    cards = await Card.find(
      {
        _id: { $in: list },
      },
      "-__v"
    );
    console.log(cards);
  } catch (e) {
    console.error(e);
    throw new Error("couldn't find cards");
  }
  res.status(200).json({ cards });
};

const createCard = async (req, res, next) => {
  const { name, column } = req.body;
  let col;
  try {
    col = await Column.findById(column);
  } catch (e) {
    console.log(e);
  }
  if (!col) {
    return res.status(404).json({ message: "no column with such id" });
  }
  const newCard = new Card({
    name,
    column: column,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newCard.save({ session: session });
    col.cards.push(newCard);
    await col.save({ session: session });
    await session.commitTransaction();
  } catch (e) {
    console.log(e);
  }

  res.status(201).json({ newCard });
};

const deleteCard = async (req, res, next) => {
  const id = req.params.id;
  let card;
  try {
    card = await Card.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
  }
  await Column.updateMany({}, { $pull: { cards: id } });

  res.status(200).json({ message: "deleted" });
};

exports.createCard = createCard;
exports.getAllCards = getAllCards;
exports.getCardById = getCardById;
exports.getCardsbyIds = getCardsbyIds;
exports.deleteCard = deleteCard;
