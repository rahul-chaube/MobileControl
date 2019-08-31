const mongodb=require("mongodb").MongoClient;

var MongoClient={
    addUser:function(name,phoneNumber,email,age,country,salary,password,callback){
        mongodb.connect("mongodb://localhost:27017",function(err,client){
            if(err) throw err;
            console.log("MongoDB is Connected ");

            var db=client.db('myDatabaseTest');
            insert(name,phoneNumber,email,age,country,salary,password,db,function (data) {

                console.log(" \n\n Step 1 "+JSON.stringify(data));
                callback(data);
            });
            client.close();
            
            // db.collection('User',function (err,collection) {
            //     if(err) throw err;
            //    var result= collection.insert({fname:fname,lname:lname,mname:mname,age:age});
            //     console.log(result);
            // })
            return "Added data ";
        })  ;      
    }
}

function insert(name,phoneNumber,email,age,country,salary,password,db,callback) {
        const collection=db.collection('user');
        collection.insert({name:name,phoneNumber:phoneNumber,email:email,age:age,country:country,salary:salary,password:password},function(err,result){
            if(err) throw err

            console.log("Collection is Added ................  "+JSON.stringify(result));
            
            callback (result);
        })    
}

module.exports=MongoClient;