var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/DataBase')
var DB=mongoose.connection
DB.on('error',()=>console.log("Error in Connecting to DataBase"))
DB.once('open',()=>console.log("Connected with DataBase"))

app.post( "/sign_up", (req,res) => {
    var name= req.body.name
    var age=req.body.age
    var email=req.body.email
    var phoneNo=req.body.phoneNo
    var gender=req.body.gender
    var password=req.body,password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phoneNo":phoneNo,
        "gender":gender,
        "password":password
    }
    DB.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Insertion Successful")
    })
    return res.redirect('signup_successful.html')
})

// const app=express()
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(2000);
console.log("Listing on port 2000")