const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
//const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
//app.use(express.urlencoded({ extened: true }));

app.use("/api", require("../apiRoutes"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(function (err, req, res) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

// app.listen(port, function () {
//   console.log("knock, knock");
//   console.log("who's there>");
//   console.log(`Your server, listening on port ${port}`);
// });

module.exports = app;
