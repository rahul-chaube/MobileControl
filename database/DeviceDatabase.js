const mongodb=require("mongodb").MongoClient;

const mongo=require("mongodb");

const DeviceClient={
    addDevice:function (user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
            checkUserExists(user_id,db,function (data) {

                if(data==1)
                {
                    addDeviceAndUser(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                        callback(err,data);
                        client.close();
                    });
        
                    
                }
                else{
                    addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                        callback(err,data);
                        client.close();
                    });
           
                }
                
            });

            // addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
            //     callback(err,data);
            //     client.close();
            // });


        });
    },
    updateDevice:function (user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,callback) {
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client)
        {
            if(err) callback(err,null);
            
            var db=client.db('myDatabaseTest');
            checkUserExists(user_id,db,function (data) {

                if(data==1)
                {
                    addDeviceAndUser(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                        callback(err,data);
                        client.close();
                    });
        
                    
                }
                else{
                    addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
                        callback(err,data);
                        client.close();
                    });
           
                }
                
            });

            // addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,function (err,data) {
            //     callback(err,data);
            //     client.close();
            // });


        });
    }
};
function addDeviceAndUser(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callbackack) {
    // db.insertOne()
    var id=new mongo.ObjectID();
    
      console.log("Uniqu id is "+id);
        var device={
            _id:id,
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

        var arr=[];
        arr.push(device);
        const collection=db.collection('DeviceDetails');
        collection.insertOne({_id:user_id,device:arr},function (err,data) {
            console.log(data);
            
            callbackack(err,device);  
        
        
      });
     
}

function addDevice(user_id,mac_id,imei,os,mnf,version,model,ram,rom,siminfo,db,callbackack) {
    // db.insertOne()
    var id=new mongo.ObjectID();
    
      console.log("Uniqu id is "+id);
        var device={
            _id:id,
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


module.exports=DeviceClient;;