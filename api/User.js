var express = require('express');
var router = express.Router();

const MongoClient=require("../database/mongodb.js");
const DeviceDetailsApi=require("./DeviceDetails.js");
router.get('/',function(req,res)
{
res.send("API is Running ");
});
router.use('/device',DeviceDetailsApi);

router.post('/user/login',function(req,res)
{
   MongoClient.login(req.body.email,req.body.password,function (err,data) {
      if(err)
      {
        var json=new Object();
        json.status=201;
        json.message=err.message;
        res.status(201);
        res.send(json);
      } 
      else
      {
        var json=new Object();
        json.status=200;
        json.message="Login SuccessFull";
        json.data=data;
        res.status(200);
        res.send(json);
      }

   }); 
// res.send("Login API is Called  ");
});

router.get('/user',function(req,res)
{
// res.send("Get User List  "+req.query.id);

MongoClient.getUserList(function (result) {

    console.log(result.length);
    if(result.length==0){
        var json=new Object();
        json.status=201;
        json.message="No user Found";
        res.status(201);
        res.send(json);
    }
    else{
        var json=new Object();
        json.status=200;
        json.message="User Found";
        json.data=result;
        res.status(200);
        res.send(json);
    }
        
    
})
});

router.put('/user',function(req,res){

    // res.send("put request "+req.body.id);

    
MongoClient.updateUser(req.body.id,req.body.name,req.body.phoneNumber,req.body.email,req.body.age,req.body.country,req.body.salary,req.body.password,function(err,result)
{
    
    if(err)
    {   
        var json=new Object();
        json.status=201;
        json.message=err.message;
        res.status(201);
        res.send(json);
       
    }
    else{
        var json=new Object();
        json.status=200;
        json.message="User Updated ";
        json.data=result.result;
        res.status(200);
        res.send(json);
        
    }
// console.log("User is Added  Successfully  "+JSON.stringify(result));

});



});
router.post('/user',function(req,res)
{

MongoClient.addUser(req.body.name,req.body.phoneNumber,req.body.email,req.body.age,req.body.country,req.body.salary,req.body.password,function(err,result)
{
    
    if(err)
    {   
        var json=new Object();
        json.status=201;
        json.message=err.message;
        res.status(201);
        res.send(json);
       
    }
    else{
        var json=new Object();
        json.status=200;
        json.message="User Added ";
        json.data=result.ops[0];
        res.status(200);
        res.send(json);
        
    }
// console.log("User is Added  Successfully  "+JSON.stringify(result));

});



});
router.delete('/user',function(req,res)
{

    MongoClient.deleteUser(req.body.email,function (err,result) {
        if(err)
        {
            var json=new Object();
            json.status=201;
            json.message=err.message;
            res.status(201);
            res.send(json);

        }
        else{
            var json=new Object();
            json.status=200;
            json.message="User Deleted Successfully"
            res.status(200);
            // json.data=result;
            res.send(json);
        }
      
    });

});
module.exports = router;