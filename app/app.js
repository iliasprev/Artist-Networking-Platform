// Import express.js
const express = require("express");
const { User } = require("./models/Users");
var app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// const app = express();


// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');
app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.static("static"))



// Create a route for root - /
app.get("/homepage", function(req, res) {
    res.render("homepage"); 
});

app.get("/network", function(req, res) {
    res.render("network");  
});

app.get("/opportunities", function(req, res) {
    res.render("opportunities"); 
});

app.get("/ourstory", function(req, res) {
    res.render("ourstory"); 
});

app.get("/signin",(req,res)=>{
    res.render("signin");
})

app.get("/contact-us",(req,res)=>{
    res.render("contact-us");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/footer",(req,res)=>{
    res.render("footer");
})
app.get("/apply1",(req,res)=>{
    res.render("apply1");
})

app.get("/payment",(req,res)=>{
    res.render("payment");
})
app.get("/card-slider",(req,res)=>{
    res.render("card-slider");
})

app.get("/thankyouapply",(req,res)=>{
    res.render("thankyouapply");
})
app.post("/thankyou",(req,res)=>{
    res.render("thankyou");
})


// app.post("/signin",async function(req,res){
//     console.log("==>ilias",req.body);
//     parameters = req.body;
// })
var myDetails = {};

app.post("/Step1",async function(req,res){
    console.log("==>Step1",req.body);
    parameters = req.body;
    var user = new User(parameters.username);
    myDetails.username = parameters.username;
    myDetails.Name = parameters.Name;
    myDetails.password = parameters.password;
    res.render("payment");
    // try {
    //     let resul = await user.addUser(parameters);
    //     console.log("Res from post loginnn",resul);
    //     res.redirect("/thankyouapply");
    //     }
    //  catch (err) {
    //     console.error(`Error while comparing `, err.message);
    // }
 })



app.post("/signin",async function(req,res){
    console.log("==>INSIGNUPPOST",req.body);
    parameters = req.body;
    var user = new User(parameters.Zipcode);
    myDetails.Zcode = parameters.Zipcode;
    myDetails.CardName = parameters.CardName;
    let num = parameters.Cardnum.slice(-2);
    myDetails.CardNum = num;

    console.log("MyDetails object",myDetails);
    try {
        let resul = await user.addUser(myDetails);
        console.log("Res from post loginnn",resul);
        res.redirect("/thankyouapply");
        }
     catch (err) {
        console.error(`Error while comparing `, err.message);
    }
 })

 app.post("/login",async function(req,res){
    console.log("==>LOGIN POST",req.body);
    parameters = req.body;
    var user = new User(parameters.username);
    console.log("INSIDE LOGIN",parameters.username);
    try {
        var UserId = await user.getIdFromEmail();
        console.log("DB MAIL and PASSWORD",UserId);
        if((UserId[0].Email == parameters.username) && (UserId[0].Password == parameters.password)){
            res.render("logHomepage");
        }else{
            res.redirect("/signin");
                }
    } catch (err) {
        console.error(`Error while comparing `, err.message);   
    }
 })
 
// New cOde starts here

app.post("/apply",async function(req,res){
    console.log("==>applyPOST",req.body);
    parameters = req.body;
    var user = new User(parameters.fullname);
    // console.log("INSIDE Apply",parameters.username);
    try {
        let restt = await user.addProfile(parameters);
         if(restt){
                console.log("Res from post Apply",restt);
                res.redirect("/thankyouapply");
            }else{
                res.send("An erro occured. Please try again");
            }
        }
        catch (err) {
        console.error(`Error while comparing `, err.message);
    }
 })
// New code ends here



// new ilias code payment starts here//





app.listen(3000, () => {
  console.log('Server running on port 3000');
});



