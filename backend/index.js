require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const connection = require("./config/db");
const router = require("./routers/router");

const app = express();
const port = process.env.SERVER_PORT;
const appOrigin = process.env.REACT_APP_API_ORIGIN;

const corsOptions = {
  origin: [
    "https://meliora-frontend.vercel.app",
    "https://www.melioraproducts.com",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/", router);

app.use(express.static(path.join(__dirname, "build")));
app.use(
  "/images",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", appOrigin);
    next();
  },
  express.static(path.join(__dirname, "public/images"))
);

connection().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

module.exports = app;
