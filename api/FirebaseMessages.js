var express = require('express');
var firebase = require('firebase');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

var router = express.Router();
var firebaseConfig = {
    apiKey: "AIzaSyBh5m0_wKxNq2Pag03qeG2taqRtFo05nAw",
    authDomain: "kiosk-4be25.firebaseapp.com",
    databaseURL: "https://kiosk-4be25.firebaseio.com",
    projectId: "kiosk-4be25",
    storageBucket: "",
    messagingSenderId: "745872635965",
    appId: "1:745872635965:web:1c52a7ad4e33798c081254"
  };
// var app = firebase.initializeApp(firebaseConfig);
admin.initializeApp(firebaseConfig);

router.get("/",function (req,res) {
   res.send("Firebase Message Test "); 
});

router.post("/",function (req,res) {
   

    sendMessage(req.body.deviceId,function (err,res) {
        if(err)
        res.send(err);
        else 
        res.send(res);
        
    })
 });


 function sendMessage(deviceId,callback) {
    var message = {
        data: {
          score: '850',
          time: '2:45'
        },
        token: deviceId
      };

      admin.messaging().send(message)
        .then((response) => {
    // Response is a message ID string.
     console.log('Successfully sent message:', response);
     callback(null,message);
     })
  .catch((error) => {
    console.log('Error sending message:', error);
    callback(error,null);
  });
     
 }
 
 
module.exports = router;