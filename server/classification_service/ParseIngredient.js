const PythonShell = require('python-shell').PythonShell;

const ParseIngredient= async(req, res, next)=>{
    if(!req.body.ingredients){
        console.log('no new ingredients')
        next()
    } else {
    let options = {
        mode:'json',
        scriptPath: './classification_service',
        pythonPath: '/opt/homebrew/bin/python',
        pythonOptions: ['-u'],
        args: [req.body.ingredients]
    }
    PythonShell.run('python_utils.py', options, function (err, results) {
        if (err) 
            throw err;
        req.parsedIngredients = results
        // console.log('results',results)
        // res.json(results).status(204)
        next()
    })
}}

module.exports = ParseIngredient