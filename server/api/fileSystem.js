var express = require("express");
var router = express.Router();
const path = require("path")

router.get("/:filename", async (req,res)=>{
  try {
    res.sendStatus(200);
} catch (err) {
    console.log(err);
}
});

module.exports = router;
