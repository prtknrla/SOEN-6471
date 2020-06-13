var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HuserSchema = new Schema(
	{
		name:{type: String, required: true},
		role:{type: String, required: true},
		id:{type: String, required: true,unique:true},
		email:{type: String, required: true},
		password:{type: String, required: true}
	});

HuserSchema.methods.getRole=function(){
	return this.role;
};

HuserSchema.methods.getName=function(){
	return this.name;
};

HuserSchema.methods.getId=function(){
	return this.id;
};

HuserSchema.methods.getEmail=function(){
	return this.email;
};



module.exports = mongoose.model("Huser", HuserSchema);
