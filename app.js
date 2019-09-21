const express=require("express");
const writeLog=require('./controller/WriteLog.js')
const createUserApi=require("./api/User.js");
var bodyParser = require('body-parser');

var responseTime = require('response-time')
const app=express();
const Config=require('./config.js');
app.use(express.static('view'));
app.use(bodyParser.json()); 
app.use(responseTime())
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

app.listen(Config.PORT_NUMBER,()=>{
    console.log("Server is Runiing on port "+Config.PORT_NUMBER);
    
    
});