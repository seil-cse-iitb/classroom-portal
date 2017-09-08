var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.database.mongo.URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	console.log("Connected to Mongo");
 //  	var User = require('./models/User');
	// var u = User.create({username:"Test",password:"test"},function(err,user){
	// 	if(err)
	// 		console.log(err);
	// 	else
	// 		console.log(user);
	// })
	var Classroom = require('./models/Classroom');
	var c201 = Classroom.create({
		  id: 205,
		  ip: "10.129.23.145",
		  port: 1883,
		  lights: [
		  	{
		  		topic: "nodemcu/SCC/LF",
		  		on_message:"L 1",
		  		off_message:"L 0",
		  	}
		  ],
		  fans: [
		  	{
		  		topic: "nodemcu/SCC/LF",
		  		on_message:"F 1",
		  		off_message:"F 0",
		  	}
		  ],
		  ACs: [
		  	{
		  		topic: "nodemcu/SCC/AC",
		  		on_message:"A 1",
		  		off_message:"A 0",
		  	}
		  ],
		}	,function(err,classroom){
		if(err)
			console.log(err);
		else
			console.log(classroom);
	})
});
