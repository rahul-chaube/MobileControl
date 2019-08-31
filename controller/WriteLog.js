const MongoClient=require("../database/mongodb.js")

var log = {
    info: function (info) { 
        console.log('Info: ' + info);

        MongoClient.addUser("Rahul","Ravi","Chaube","26");
    },
    warning:function (warning) { 
        console.log('Warning: ' + warning);
    },
    error:function (error) { 
        console.log('Error: ' + error);
    }
};
module.exports =log