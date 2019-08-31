var express = require('express');
var router = express.Router();

const MongoClient=require("../database/mongodb.js")

router.get('/',function(req,res)
{
res.send("API is Running ");
});

router.get('/user',function(req,res)
{
res.send("Get User List  "+req.query.id);
});


router.post('/user',function(req,res)
{

MongoClient.addUser(req.body.name,req.body.phoneNumber,req.body.email,req.body.age,req.body.country,req.body.salary,req.body.password,function(result)
{
    
// console.log("User is Added  Successfully  "+JSON.stringify(result));
res.send(result);
});



});
router.delete('/user',function(req,res)
{
res.send("Delete User ");
});
module.exports = router;