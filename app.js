const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./routes/");

app.use(
  require("express-session")({
    //sessions
    secret: "hey there, you still can't hack this",
    resave: false,
    saveUninitialized: false
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/", routes);

module.exports = app;
