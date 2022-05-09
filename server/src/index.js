const express = require("express");

const route = require("./routes");

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

//import DB
const connectDatabase = require("./config/database");
//Connect to db
connectDatabase();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//Routes init
route(app);

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${5000}`);
});
