var express = require('express');
var router = express.Router();
var DeviceDetails=require("../database/DeviceDatabase.js");
router.get("/",function (req,res) {
   res.send("Mobile Details API "); 
});


router.post("/getDevice",function (req,res) {
    // res.send("Mobile Details API "); 

    DeviceDetails.getDevice(req.body.deviceID,function (err,result) {
        if(err)
        {
            var json=new Object();
            json.status=401;
            json.message="No Device Found ";
            // json.device=result;
            res.status(401);
            res.send(json);
        }
        else{
            var json=new Object();
            json.status=200;
            json.message="Get Device ";
            json.device=result;
            res.status(200);

          
            


            res.send(json);
        }
    });
 });

 router.post("/getAllDevice",function (req,res) {
    const count=10;
     pageNumber=req.body.pageNo;
    var skip=count*(pageNumber -1);

    console.log(count +"      "+pageNumber+"          "+skip+"   " +req.body.user_id);
    
    // res.send("Mobile Details API "); 
    if(req.body.pageNo==undefined)
    {
        var json=new Object();
        json.status=401;
        json.message="Page Number Not Defined ";
        // json.device=result;
        res.status(401);
        res.send(json);

    }
   else if(pageNumber<=0)
    {
        var json=new Object();
        json.status=401;
        json.message="Invalid Page NUmber ";
        // json.device=result;
        res.status(401);
        res.send(json);
    }
    
    else if(req.body.user_id==undefined)
    {
        var json=new Object();
        json.status=401;
        json.message="User ID not Defined ";
        // json.device=result;
        res.status(401);
        res.send(json);

    }
else{
    DeviceDetails.getAllDevice(req.body.user_id,pageNumber,function (err,result) {
        if(err)
        {
            var json=new Object();
            json.status=401;
            json.message="No Device Found ";
            // json.device=result;
            res.status(401);
            res.send(json);
        }
        else{
            var json=new Object();
            json.status=200;
            json.pageNo=pageNumber;
            json.message="Get Device ";
            json.device=result;
            res.status(200);

          
            


            res.send(json);
        }
    });
}
 });

router.post("/",function (req,res) {
    DeviceDetails.addDevice(req.body.fcmId,req.body.dname,req.body.user_id,req.body.mac_id,req.body.imei,req.body.os,req.body.mnf,
        req.body.version,req.body.model,req.body.ram,req.body.rom,req.body.siminfo,function (err,result) {
            if(err)
            {
                var json=new Object();
                json.status=201;
                json.message=err.message;
                // json.device=result;
                res.status(201);
                res.send(json);
            }
            else
            {
                var json=new Object();
                json.status=200;
                json.message="Device Added Succefully ";
                json.device=result.ops[0];
                res.status(200);
                res.send(json);
                // res.send(result);
            
            }
        });

 });

 router.put("/",function (req,res) {
    DeviceDetails.updateDevice(req.body.deviceID,req.body.dname,req.body.user_id,req.body.mac_id,req.body.imei,req.body.os,req.body.mnf,
        req.body.version,req.body.model,req.body.ram,req.body.rom,req.body.siminfo,function (err,result) {
            if(err)
            {
                var json=new Object();
                json.status=201;
                json.message=err.message;
                // json.device=result;
                res.status(201);
                res.send(json);
            }
            else
            {
                var json=new Object();
                json.status=200;
                json.message="Device Updated  Succefully ";
                json.device=result;
                res.status(200);
                res.send(json);
                // res.send(result);
            
            }
        });

 });

module.exports = router;