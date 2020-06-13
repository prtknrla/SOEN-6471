var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookaptSchema = new Schema({
	username: {type:String, required:true},
	userid: {type:String, required:true},
	date: {type:String, required:true}
});

module.exports = mongoose.model("Bookapt", bookaptSchema);
