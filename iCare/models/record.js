var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recordSchema = new Schema({
	username: {type:String},
	userid: {type:String, required:true},
	date: {type: Date, default: Date.now},
	bp:{type:String},
	sugarlevel:{type:String},
	pulse:{type:String}
});

module.exports = mongoose.model("Record", recordSchema);
