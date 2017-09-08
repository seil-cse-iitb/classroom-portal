var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var mqtt = require('mqtt');
var Classroom = require('../models/Classroom')
/* GET home page. */
router.get('/:class_id/:appliance/:state', function(req, res, next) {
	console.log(req.params.class_id)
	Classroom.findOne({id : req.params.class_id}, function(err, classroom) {
	    if( err || !classroom) {
	        console.log("No classroom found");
	        res.sendStatus(404);
	    } else {            
	        
	        var mqttClient = mqtt.connect("mqtt://"+classroom.ip);
	        mqttClient.on('connect',function(){
	        	mqttClient.publish(classroom[req.params.appliance][0].topic, classroom[req.params.appliance][0][req.params.state+"_message"])
	        	res.send("Success")
	        })

	    };
	});


});

module.exports = router;
