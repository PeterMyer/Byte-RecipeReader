
const app = require("./server/index");
const port = process.env.PORT || 3000;


  app.listen(port, function () {
    console.log("knock, knock");
    console.log("who's there>");
    console.log(`Your server, listening on port ${port}`);
  });
;
