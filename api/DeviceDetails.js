var express = require('express');
var router = express.Router();
var DeviceDetails=require("../database/DeviceDatabase.js");
router.get("/",function (req,res) {
   res.send("Mobile Details API "); 
});

router.post("/",function (req,res) {
    DeviceDetails.addDevice(req.body.user_id,req.body.mac_id,req.body.imei,req.body.os,req.body.mnf,
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
                json.device=result;
                res.status(200);
                res.send(json);
                // res.send(result);
            
            }
        });

 });

 router.put("/",function (req,res) {
    DeviceDetails.addDevice(req.body.user_id,req.body.mac_id,req.body.imei,req.body.os,req.body.mnf,
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
                json.device=result;
                res.status(200);
                res.send(json);
                // res.send(result);
            
            }
        });

 });

module.exports = router;