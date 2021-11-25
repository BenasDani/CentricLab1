var express = require('express')
var app = express()
var numOfRequests = 0;
var serverAccessed = 0;

//midelware fubction called before the routing
var countAccess = function(req, res, next){
    serverAccessed++
    console.log("Server Accessed " + serverAccessed+ " times")
    next()//calls next middleware function
}

var nextMW = function(req, res, next) {
    console.log("IN NextMW")
    next()
}

//route 1
app.get('/', [countAccess], (req, res)=>{
    res.send('<h1>This is Question 1.1</h1>')
})
//route 2
app.get('/about', [countAccess, nextMW], (req, res)=>{
    res.sendFile(__dirname + "/views/hello.html")
    
})
//route 3
app.get('/details', [countAccess], (req, res)=>{
   
    //increments number of requests
    numOfRequests++
    var d = new Date
    console.log("In /details request number: " + numOfRequests + " from: " + req.hostname + " at:" + d.getHours() + ":" + d.getMinutes())
    //redirects to other port
    res.redirect("/")
    
    
})



//callback function
app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})

