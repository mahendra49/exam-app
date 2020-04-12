const mongoose = require("mongoose");

process.on("uncaughtException", err => {
  console.log("UNCAUGHT EXCEPTION!!! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app.js");

const database = "mongodb://localhost/exam-app";

// Connect the database
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log("DB connection Successfully!");
  });

//Developed with love by _tars49
const port = 3000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

process.on("unhandledRejection", err => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
