require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const { redirect } = require('express/lib/response');



const tasks=["TaskA", "TaskB","TaskC"]

const app=express();



app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));





mongoose.connect("mongodb://127.0.0.1:27017/totodoDB2022");
const userSchema=new mongoose.Schema({
     
    nameOfUser:String,
    username: String,
    password: String,
    tasks:[{
        type: String
    }]
})




const User=mongoose.model("user", userSchema)




app.get("/login",function(req,res){

    res.render('login');
})
app.route("/dashboard/:_id").get(function(req,res){

    const userdata=req.params._id;

    User.findOne({_id: userdata}, function(err,result){

      if(err){
          console.log(err);
      }else{
        
        res.render("dashboard", {person:result, nameOfUser: result.nameOfUser})
      }



    })
   
  

}).post(function(req,res){

   User.findOne({_id:req.params._id}, function(err,result){


   if(err){

    console.log(err)
   }else{
       
    newTasks= result.tasks.push(req.body.newTask)
     result.save();

     res.redirect("/dashboard/"+req.params._id)
      
   }
    


   })


 

})


app.route("/register").get(function(req,res){

    res.render('register');
  

}).post(function(req,res){

      const newUser=new User({

        nameOfUser:req.body.nameOfUser,
        username:req.body.username,
        password:req.body.password,
        tasks:tasks

      })
      newUser.save();
      res.redirect("/dashboard/"+newUser._id)
})

app.post("/login",function(req,res){
 
    User.findOne({username:req.body.username},function(err,result){

        if(err){
     
            res.send(err)
           }else{
        
            if(result){
        
                if(result.password===req.body.password){
        
                    res.redirect("/dashboard/"+result._id);
            
                }else{
                    res.send("Incorrect password");
                }
        
                
        
            }else{
                  

                res.redirect("/register");
        
            
            
           }}
            
        
     })
     
 
 
})
app.listen(3000, function(){

    console.log("Server running on port 3000")
})