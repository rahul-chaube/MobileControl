const express=require("express");
const writeLog=require('./controller/WriteLog.js')
const createUserApi=require("./api/User.js");
var bodyParser = require('body-parser');
const app=express();

app.use(express.static('view'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.get("/",(req,res)=>{
        res.send("Hello World");
        writeLog.info("Write is done here ");
        
});
app.get("/addUser",(req,res)=>{
    res.sendFile(__dirname +"/view/Login.html");
});

app.use('/api',createUserApi);

app.listen(3000,()=>{
    console.log("Server is Runiing on port 3000");
    
});