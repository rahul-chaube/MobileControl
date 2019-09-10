const mongodb=require("mongodb").MongoClient;

var ObjectId = require('mongodb').ObjectID;

var randomize = require('randomatic');
const DeviceClient={
    getDevice:function (deviceID,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findDevice(deviceID,db,function (err,data) {

                        callback(err,data);
                        client.close();
                    });
        });
        
    },
    getAllDevice:function (user_id,pageNumber,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findAllDevice(user_id,pageNumber,db,function (err,data) {

                        callback(err,data);
                        client.close();
                    });
        });
        
    },
    addDevice:function (fcmId,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    addDeviceAndUser(fcmId,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                        callback(err,data);
                        client.close();
                    });
        
                    

        });
    },
    updateDevice:function (deviceID,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findDevice(deviceID,db,function (err,data) {
                        if(err)
                        callback(err,data);
                        if(data.length==0)
                        {
                            callback(new Error("No Device Found"));
                        }
                        else{
                        updateDevice(deviceID,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                            callback(err,data);
                            client.close();
                            
                        });
                    }
                        
                    });

           

        });
    },
    addMutipleApps:function (deviceID,apps,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findDevice(deviceID,db,function (err,data) {
                        if(err)
                        callback(err,data);
                        if(data.length==0)
                        {
                            callback(new Error("No Device Found"));
                        }
                        else{
                        addMultipleApp(deviceID,apps,db,function (err,data) {
                            callback(err,data);
                            client.close();
                            
                        });
                    }
                        
                    });

           

        });
    },
    addApps:function (deviceID,apps,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findDevice(deviceID,db,function (err,data) {
                        if(err)
                        callback(err,data);
                        if(data.length==0)
                        {
                            callback(new Error("No Device Found"));
                        }
                        else{
                        addApp(deviceID,apps,db,function (err,data) {
                            callback(err,data);
                            client.close();
                            
                        });
                    }
                        
                    });

           

        });
    },
    delete:function (deviceID,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    findDevice(deviceID,db,function (err,data) {
                        if(err)
                        callback(err,data);
                        if(data.length==0)
                        {
                            callback(new Error("No Device Found"));
                        }
                        else{
                        deleteDevice(deviceID,db,function (err,data) {
                            callback(err,data);
                            client.close();
                            
                        });
                    }
                        
                    });

           

        });
    },
    deleteAll:function (userId,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');


            deleteUserDevice(userId,db,function (err,data) {
                callback(err,data);
                client.close();
                
            });
                    // findDevice(deviceID,db,function (err,data) {
                    //     if(err)
                    //     callback(err,data);
                    //     if(data.length==0)
                    //     {
                    //         callback(new Error("No Device Found"));
                    //     }
                    //     else{
                    //     deleteUserDevice(userId,db,function (err,data) {
                    //         callback(err,data);
                    //         client.close();
                            
                    //     });
                    // }
                        
                    // });

           

        });
    }
};
function addDeviceAndUser(fcmId,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callbackack) {
        const collection=db.collection('DeviceDetails');
        const deviceTocken=randomize('A0', 8);
        collection.insertOne({dname:dname,user_id:user_id,imei:imei,mac_id:mac_id,os:os,mnf:mnf,version:version,
            model:model,ram:ram,rom:rom,device_tocken:deviceTocken,fcmId:fcmId,assigned:false,siminfo:JSON.parse(siminfo) },function (err,data) {
                       callbackack(err,data);  
        
        
      });
     
}

function addMultipleApp(deviceId,apps,db,callback)
{
    const collection=db.collection('DeviceDetails');
    collection.updateOne({_id:ObjectId(deviceId)},{$set:{appList:JSON.parse(apps)}},function (err,data) {
        callback(err,data);
    });
}

function addApp(deviceId,apps,db,callback)
{
    const collection=db.collection('DeviceDetails');
    collection.updateOne({_id:ObjectId(deviceId)},{$push:{appList:JSON.parse(apps)}},function (err,data) {
        callback(err,data);
    });
}

function addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callbackack) {
    // db.insertOne()
    
        var device={
        
            imei:imei,
            mac_id:mac_id,
            os:os,
            mnf:mnf,
            version:version,
            model:model,
            ram:ram,
            rom:rom,
            siminfo:JSON.parse(siminfo) 
        };

        // var arr=[];
        // arr.push(device);
        const collection=db.collection('DeviceDetails');
        collection.findOneAndUpdate({_id:user_id},{$push:{device:device}},function (err,data) {
            callbackack(err,device);  
        
        
      });
}
function checkUserExists(id,db,callback)
{
    const collection=db.collection('DeviceDetails');
    collection.find({_id:id}).toArray(function(err,docs){
        if(err)    callback(-1);  
        if(docs.length==0){
            callback(1);  
        }
        else{
             callback(0);  
            //  return 0; 
        }
    });

}

function findDevice(device_id,db,callback) {
    
    const collection=db.collection('DeviceDetails');
    collection.find({ "_id":ObjectId(device_id)}).toArray(function (err,data) {

        console.log("*** "+data);
        if(err) throw err;
        callback(err,data);
    });
    
}

function findAllDevice(user_id,pageNumber,db,callback) {
    const count =10;
    var skipList=count*(pageNumber-1);
    const collection=db.collection('DeviceDetails');
    collection.find({ "user_id":user_id}).skip(skipList).limit(count).toArray(function (err,data) {

    
        if(err) throw err;
        callback(err,data);
    });
    
}
function updateDevice(deviceID,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callback) {
    const collection=db.collection('DeviceDetails');
    collection.updateOne({_id:ObjectId(deviceID)},{$set:{dname:dname,mac_id:mac_id,imei:imei,os:os,mnf:mnf,version:version,model:model,ram:ram,rom:rom,siminfo:siminfo}},function (err,data) {
        callback(err,data);
    });
}

function deleteDevice(deviceID,db,callback) {
    const collection=db.collection('DeviceDetails');
    collection.deleteOne({_id:ObjectId(deviceID)},function (err,data) {
        callback(err,data);
    });
}

    function deleteUserDevice(user_id,db,callback) {
        const collection=db.collection('DeviceDetails');
        collection.deleteMany({user_id:user_id},{multi:true},function (err,data) {
            callback(err,data);
        });
}


module.exports=DeviceClient;;