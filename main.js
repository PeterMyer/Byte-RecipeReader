const db = require("./server/db/database");
const app = require("./server/index");
const port = process.env.PORT || 3000;

db.sync().then(function () {
  app.listen(port, function () {
    console.log("knock, knock");
    console.log("who's there>");
    console.log(`Your server, listening on port ${port}`);
  });
});
