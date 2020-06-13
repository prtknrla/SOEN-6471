var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
	username: {type:String, required:true},
	userid: {type:String, required:true},
	date: {type:String, required:true},
	docname:{type:String, required:true},
	docid:{type:String, required:true},
	nursename:{type:String, required:true},
	nurseid:{type:String, required:true}
});

module.exports = mongoose.model("Schedule", scheduleSchema);
