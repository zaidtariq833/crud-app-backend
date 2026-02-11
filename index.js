const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.routes");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
require("./models");

app.get("/", (req, res) => {
  res.send("this is test root url");
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

const port = process.env.PORT || 5001;
server.listen(port, "0.0.0.0", () => {
  console.log(`app is listening at http://localhost:${port}`);
});
