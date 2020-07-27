const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

const username = "tatak";
const password = "$2b$10$WFP2SIbv7BqckA1S5rq/reYW0YEpHDwgPXTPFW4CGcFcnaDHplFoy";

const db = require("knex")({
  client: "pg",
  version: "8.2",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "r0ckmygam3",
    database: "tatakcash",
  },
});

app.use(cors());
app.use(bodyParser.json());

app.get("/transactions", (req, res) => {
  db.select("*")
    .from("transactions")
    .then((transactions) => res.status(200).json(transactions))
    .catch((err) => res.status(404).json("Something Went Wrong"));
});

app.post("/addtransaction", (req, res) => {
  const { name, date, transaction, type, amount } = req.body;
  db("transactions")
    .insert({ name, trans_date: date, transaction, type, amount })
    .then((transaction) => res.status(200).json(transaction))
    .catch((err) => res.status(400).send(err));
});

app.post("/login", (req, res) => {
  if (username === req.body.username) {
    bcrypt.compare(req.body.password, password, function (err, result) {
      if (result) {
        res.status(200).json({ verified: true });
      } else {
        res.status(400).json("Username or Password is incorrect");
      }
    });
  } else {
    res.status(400).json("Username or Password is incorrect");
  }
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
