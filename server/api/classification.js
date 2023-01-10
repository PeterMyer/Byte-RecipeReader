const PythonShell = require("python-shell").PythonShell;
const express = require("express");
const router = express.Router();

router.post("/", (req, res)=> {
    let options = {
    mode:"json",
    scriptPath: "./classification_service",
    pythonPath: "/opt/homebrew/bin/python",
    pythonOptions: ["-u"],
    args: [[req.body.data]]
}
    PythonShell.run("python_utils.py", options, function (err, results) {
        if (err) 
            throw err;
    res.json(results).status(204).end()
})})

module.exports = router
