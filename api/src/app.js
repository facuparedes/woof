const morgan = require("morgan");
const express = require("express");
const routes = require("./routes");
const app = express();

app.name = "API";

app
  .use(express.urlencoded({ extended: true, limit: "50mb" }))
  .use(express.json({ limit: "50mb" }))
  .use(morgan("dev"))
  .use((_, res, next) => {
    res
      .header("Access-Control-Allow-Origin", "http://localhost:3000")
      .header("Access-Control-Allow-Credentials", "true")
      .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
      .header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  })
  .use("/", routes)
  .use((err, _, res, __) => {
    // Error catching endware.
    const { status = 500, message: error = err } = err;

    // console.error(err);
    res.status(status).json({ error });
  });

module.exports = app;
