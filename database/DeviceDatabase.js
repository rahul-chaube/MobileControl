const mongodb=require("mongodb").MongoClient;


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

    addDevice:function (dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
                    addDeviceAndUser(dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
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
    }
};
function addDeviceAndUser(dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callbackack) {
        const collection=db.collection('DeviceDetails');
        collection.insertOne({dname:dname,user_id:user_id,imei:imei,mac_id:mac_id,os:os,mnf:mnf,version:version,
            model:model,ram:ram,rom:rom,siminfo:JSON.parse(siminfo) },function (err,data) {
                       callbackack(err,data);  
        
        
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
    collection.find({ "dname":"Samsung M20"},function (err,data) {

        console.log("*** "+data);
        if(err) throw err;
        callback(err,data);
    });
    
}
function updateDevice(deviceID,dname,user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callback) {
    const collection=db.collection('DeviceDetails');
    collection.updateOne({_id:deviceID},{$set:{dname:dname,mac_id:mac_id,imei:imei,os:os,mnf:mnf,version:version,model:model,ram:ram,rom:rom,siminfo:siminfo}},function (err,data) {
        callback(err,data);
    });
}


module.exports=DeviceClient;;