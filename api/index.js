const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// models
const { User } = require("./models");

// routes
const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");

// controllers
// const homeController = require("./controllers/home");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("images"));
app.use(bodyParser.json());
app.use(cors());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/auth", userRoutes);
app.use("/session", sessionRoutes);

// TODO: switch to migration instead of this
// sync models & run the app
/*
(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
    // console.log(result);
    app.listen(port, () => {
      console.log(`Session Boking app listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();
*/

app.listen(port, () => {
  console.log(`Session Boking app listening on http://localhost:${port}`);
});
