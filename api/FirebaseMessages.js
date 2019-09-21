var express = require('express');
var admin = require("firebase-admin");
var request = require('request');
var router = express.Router();


var FCM = require('fcm-node');
var serverKey = 'AAAAral5OD0:APA91bG7LiHFfsZXQpLRPNh6Dka58xRkjvsZq7AZ7syrhXk6RjHi_5O2isaktmyMu2dYgC3hOKX0w30wHZEYPcfhKvGHPKxHnB7TGVyIkdUSIw_OtWIz8j3lH5kguMlRdxgsWlOwEiDT'; //put your server key here
var fcm = new FCM(serverKey);

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBh5m0_wKxNq2Pag03qeG2taqRtFo05nAw",
  authDomain: "kiosk-4be25.firebaseapp.com",
  databaseURL: "https://kiosk-4be25.firebaseio.com",
  projectId: "kiosk-4be25",
  storageBucket: "",
  messagingSenderId: "745872635965",
  appId: "1:745872635965:web:1c52a7ad4e33798c081254"
};

firebase.initializeApp(firebaseConfig);


router.get("/",function (req,res) {
   res.send("Firebase Message Test "); 
});

router.post("/",function (req,res) {
   

    sendMessage(req.body.deviceId,function (err,result) {
        if(err)
        res.send(err);
        else 
        res.send(result);
        
    })
 });


 function sendMessage(deviceId,callback) {
  // const messaging = firebase.messaging();
  // var defaultApp = admin.initializeApp(firebaseConfig);

  // console.log(defaultApp);
  // const messaging = firebase.messaging();
  // console.log(defaultProject.name);  // "[DEFAULT]"
 var message= {
    'to' :deviceId,
    "data" : {
    "syncid" : "How Are you ?? \n \n \n testing Lenavo ",
    "fstatus" : "5126566"
    },
    "notification": {
      "title": "FCM Message",
      "body": "This is a message from FCM" +new Date()
    },
  }

  fcm.send(message,function (error,response) {
    callback(error,response);
    
  })

  
// request.post({
//   headers: {'content-type' : 'application/json','Authorization':"key=AAAAral5OD0:APA91bG7LiHFfsZXQpLRPNh6Dka58xRkjvsZq7AZ7syrhXk6RjHi_5O2isaktmyMu2dYgC3hOKX0w30wHZEYPcfhKvGHPKxHnB7TGVyIkdUSIw_OtWIz8j3lH5kguMlRdxgsWlOwEiDT"},
//   url:     'https://fcm.googleapis.com/fcm/send',
//   json:    message
// }, function(error, response, body){
//   if(error)
//   console.log(error);
  
//   callback(error,response.body);
 
// });
 }
 
 
module.exports = router;