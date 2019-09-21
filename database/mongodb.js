const mongodb=require("mongodb").MongoClient;
const Config=require('../config.js')
var MongoClient={

    login:function(email,password,callback){
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
            if(err) throw err;
           
            var db=client.db(Config.DATABSENAME);
            

            checkUserExists(email,db,function(result)
            {
                if(result==0)
                {
                    login(email,password,db,function (err,data) {
                        if(err) {
                            
                            callback(err,data);
                            
                        }
                        else{
                            if (data==null || data.length==0) {
                                callback(new Error("Invalid Credatials "),null);
                            }
                            else{
                                callback(null,data);
                            }
                       
                        }
                    });
                }
                else{
                    callback(new Error("No user Found ,Please Register First "),null);
                }
                client.close();
           
            });
        })  ;

    },

    addUser:function(name,phoneNumber,email,age,country,salary,password,callback){
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
            if(err) throw err;
            console.log("MongoDB is Connected ");

            var db=client.db(Config.DATABSENAME);
            

            checkUserExists(email,db,function(result)
            {
                if(result==1)
                {
                    insert(name,phoneNumber,email,age,country,salary,password,db,function (data) {
                        callback(null,data);

                    });
                }
                else{
                    callback(new Error("User Aleady exists"),null);
                }
                client.close();
           
            });
        })  ;      
    },
    updateUser:function(id,name,phoneNumber,email,age,country,salary,password,callback){
        mongodb.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
            if(err) throw err;
            console.log("MongoDB is Connected ");

            var db=client.db(Config.DATABSENAME);
            

            checkUserExists(email,db,function(result)
            {
                if(result==0)
                {
                    update(id,name,phoneNumber,email,age,country,salary,password,db,function (data) {
                        callback(null,data);

                    });
                }
                else{
                    callback(new Error("No user Found "),null);
                }
                client.close();
           
            });
        })  ;      
    },
    getUserList:function(callback){
        mongodb.connect("mongodb://localhost:27017" ,{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
            if(err) throw err;
            var db=client.db(Config.DATABSENAME);
            getUser(db,function (data) {

                callback(data);
            });
            client.close();
        })  ;    

    },
    deleteUser:function (email,callback) {
        mongodb.connect("mongodb://localhost:27017" ,{ useNewUrlParser: true, useUnifiedTopology: true },function(err,client){
            if(err) throw err;
            var db=client.db(Config.DATABSENAME);
            deleteUser(email,db,function (err,data) {
                if(err)
                {
                    callback(err,null)
                }
                else
                {

                    console.log("In delete  "+data);
                    
                   if(data.result.n==0)
                   callback(new Error("No Data to Delete "),null);
                   else 
                    callback(null,data);
                }
              
            });
            client.close();
        })  ;    

        
    }
}

function insert(name,phoneNumber,email,age,country,salary,password,db,callback) {
        const collection=db.collection(Config.USER_COLLCTION);
        collection.insertOne({name:name,phoneNumber:phoneNumber,email:email,age:age,country:country,salary:salary,password:password},function(err,result){
            if(err) throw err
            callback (result);
        })    
}

function update(id,name,phoneNumber,email,age,country,salary,password,db,callback) {
    const collection=db.collection(Config.USER_COLLCTION);
    collection.updateOne({_id:id},{$set:{name:name,phoneNumber:phoneNumber,age:age,country:country,salary:salary,password:password}},{ upsert: true },function(err,result){
        if(err) throw err
        callback (result);
    })    
}
function login(email,password,db,callback) {
    const collection=db.collection(Config.USER_COLLCTION);
    collection.findOne({email:email,password:password},function(err,result){
        // if(err) throw err
        // callback (result);
        callback(err,result);
    })    
}

function getUser(db,callback)
{
    const collection=db.collection(Config.USER_COLLCTION);
    collection.find({},{_id:1}).toArray(function(err, docs) {
        if(err) throw err;
        callback(docs);
      });

}
function checkUserExists(email,db,callback)
{
    const collection=db.collection(Config.USER_COLLCTION);
    collection.find({email:email}).toArray(function(err,docs){
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

function deleteUser(email,db,callback) {
    const collection=db.collection(Config.USER_COLLCTION);
    collection.deleteOne({email:email},function(err,docs){
        

        callback(err,docs);
    });
        
}

module.exports=MongoClient;