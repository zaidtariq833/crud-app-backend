const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
// Note: body-parser is now built into express, but keeping it won't hurt.
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// 1. Import your DB object
const db = require("./models");

// Middleware
app.use(cors()); // Added CORS - essential for live apps to be accessed by a frontend
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

const port = process.env.PORT || 5001;

db.sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log("✅ Database synced");
    server.listen(port, () => {
      console.log(port, "port");
      console.log(`🚀 App is listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to sync DB:", err);
  });
