require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');


const app=express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs')

mongoose.connect("mongodb://127.0.0.1:27017/totodoDB");
const userSchema=new mongoose.Schema({

    username: String,
    password: String
})
const User=mongoose.model("user", userSchema)

app.get("/",function(req,res){

    res.render('login');
})
app.route("/dashboard").get(function(req,res){

    res.render('dashboard');
  

})
app.route("/register").get(function(req,res){

    res.render('register');
  

}).post(function(req,res){

    res.redirect("/dashboard");

    const newUser=new User({

        username: req.body.username,
        password:req.body.password
    })

  newUser.save();
})
app.listen(3000, function(){

    console.log("Server running on port 3000")
})