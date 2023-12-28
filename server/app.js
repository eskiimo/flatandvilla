const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const col_router = require("./routes/column-routes");
const card_router = require("./routes/card-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // for CORS errors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use("/columns", col_router);
app.use("/cards", card_router);

const DB_URL =
  "mongodb+srv://kareem:kareemandvila@flat-cluster.skuuq1y.mongodb.net/";

mongoose
  .connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(" Server Connected to DB on localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
