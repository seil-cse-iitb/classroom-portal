var mongoose = require('mongoose');


var LightSchema = new mongoose.Schema({
	id:String,
	topic: String,
	on_message: String,
	off_message: String
})
var FanSchema = new mongoose.Schema({
	id:String,
	topic: String,
	on_message: String,
	off_message: String
})
var ACSchema = new mongoose.Schema({
	id:String,
	topic: String,
	on_message: String,
	off_message: String
})
var ClassroomSchema = new mongoose.Schema({
  id: Number,
  ip: String,
  port: Number,
  lights: [LightSchema],
  fans: [FanSchema],
  ACs: [ACSchema]
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
