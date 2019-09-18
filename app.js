const express=require("express");
const writeLog=require('./controller/WriteLog.js')
const createUserApi=require("./api/User.js");
var bodyParser = require('body-parser');
const app=express();

app.use(express.static('view'));
app.use(bodyParser.json()); 
app.get("/",(req,res)=>{
        // res.send("Server is Running ");
        // writeLog.info("Write is done here ");

        res.sendFile(__dirname +"/view/index.html");
        
});
app.get("/addUser",(req,res)=>{
    res.sendFile(__dirname +"/view/Login.html");
});

app.use('/api',createUserApi);

app.use(function(req, res, next) {
            var json=new Object();
        json.status=404;
        json.message="Bad Url";
        res.status(404);
        res.send(json);
});

//  app.all('*',function (req,res) {
//         var json=new Object();
//         json.status=404;
//         json.message="Bad Url";
//         res.status(404);
//         res.send(json);
//     })

app.listen(3000,()=>{
    console.log("Server is Runiing on port 3000");
    
    
});