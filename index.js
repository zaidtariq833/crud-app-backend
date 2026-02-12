const express = require("express");
const app = express();

const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.json({
    status: "done",
    message: "Server is live and running!",
  });
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

db.sequelize.sync({ force: false });

module.exports = app;
