var Admin = require('../models/huser')

exports.admin_detail = function(req,res){
	res.send('NOT IMPLEMENTED: admin detail: '+req.params.id);
};

exports.index = function(req,res){
	res.render("admin_index");
};

exports.home = function(req,res){
	res.send('Not Implemented : admin home'+req.params.id);
};

