const Column = require("../models/column-model");

const getAllColumns = async (req, res, next) => {
  let columns;
  try {
    columns = await Column.find();
  } catch (e) {
    res.status(500).json({ message: "something went wrong, try again.." });
  }
  res.status(200).json({ columns });
};

const getColumnById = async (req, res, next) => {
  const id = req.params.id;
  let column;
  try {
    column = await Column.find({ id: id });
  } catch (e) {
    res.status(500).json({ message: "something went wrong, try again.." });
  }

  res.status(200).json({ column });
};

const createColumn = async (req, res, next) => {
  console.log(req.body);
  const { name } = req.body;
  const createdColumn = new Column({
    name,
    cards: [],
  });

  try {
    await createdColumn.save();
  } catch (e) {
    console.error(e);
  }

  res.status(201).json({ createdColumn });
};

exports.createColumn = createColumn;
exports.getAllColumns = getAllColumns;
exports.getColumnById = getColumnById;
