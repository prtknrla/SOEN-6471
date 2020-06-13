var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var Huser = require('../models/huser');
var Bookapt = require('../models/bookapt');
var Schedule = require('../models/schedule');
var Record = require('../models/record');

// Admin routes
router.get('/', function(req,res,next){
	res.render('index');
});


router.get('/patient_signup', function(req,res,next){
	res.render('patient_signup');
});

router.post('/patient_signup', function(req,res,next){

//	console.log(req.body.name);
//	console.log(req.body.uid);
		
		
	var uname = req.body.name;
	var uid=req.body.uid;
	var uemail=req.body.email;
	var urole = "patient";
	var upassword = req.body.password;

	 var newHuser = new Huser({
                        name: uname,
                        id: uid,
                        role: urole,
                        password: upassword,
                        email:uemail
                });
                newHuser.save(
                function(err){
                        if (err){
                                console.log("ERROR")
                                throw err;
                                return res.send("ERROR")
                        }});

	res.render('index');
});

router.post('/admin_home', function(req, res, next) {
    console.log(req.body.id)
    res.render('admin', {params: {par1: req.body.id}});
        
});

router.get('/admin_signin', function(req, res, next) {
	res.render('admin_signin');
});


router.get('/signin',function(req,res,next){
	res.render('signin');
});

router.post('/signin', function(req,res,next){

	if(req.body.role =="patient"){
		res.render('patient',{uid:req.body.id, msg:""});
	}else{
		res.render('doctor',{uid:req.body.id});
	}
});


router.get('/doctor/:docid', function(req,res,next){

	res.render('doctor',{uid:req.params.docid});
});


router.post('/signup', function(req, res, next){
	var uname = req.body.name;
	var uid = req.body.id;
	var uemail = req.body.email;
	var urole = req.body.role;
	var upassword = req.body.password;

	console.log(uname)
	console.log(uid)
	console.log(uemail)
	console.log(urole)
	console.log(upassword)
		var newHuser = new Huser({
			name: uname,
			id: uid,
			role: urole,
			password: upassword,
			email:uemail
		});
		newHuser.save(
		function(err){
			if (err){
				console.log("ERROR")
				throw err;
				return res.send("ERROR")
			}}
		);
 res.render('admin', {params: {par1: req.body.id}});
});

router.post('/bookappointment', function(req,res,next){
	var uname = req.body.name;
	var uid = req.body.uid;
	var date = req.body.date;

      	var newAppointment = new Bookapt({
		username:uname,
		userid:uid,
		date:date
	});
	newAppointment.save(
		function(err){
			if(err){
				console.log("ERROR")
                                throw err;
                                return res.send("ERROR")
                        }}
	);

	res.render('patient', {uid:req.body.uid, msg:"Booking Successful"});
});

router.post('/newrecord', function(req,res,next){

	var uname = req.body.name;
	var uid = req.body.uid;
	var ubp = req.body.bp;
	var usugar = req.body.sugarlevel;
	var upulse = req.body.pulserate;

	var newRecord = new Record({
		username:uname,
		userid:uid,
		bp:ubp,
		sugarlevel:usugar,
		pulse:upulse});
	newRecord.save(
                function(err){
                        if(err){
                                console.log("ERROR")
                                throw err;
                                return res.send("ERROR")
                        }}
        );

        res.render('patient', {uid:req.body.uid, msg:"Record Update Successful"});
});


router.post('/getDocApt', function(req,res,next){

	Schedule.find({docid:req.body.docid}, function(err, appointments){
                if(err) {
                        throw err;
                        return res.send("ERROR")
                }

                var count = appointments.length;

                res.render('doc_bookings', {params:appointments, pos:count, doc:req.body.docid});

        });

});


router.post('/getrecords', function(req,res,next){
	Record.find({userid:req.body.uid}, function(err,records){
		if(err) {
                        throw err;
                        return res.send("ERROR")
                }
		console.log(records[0])

                var count = records.length;
		res.render('get_records', {params:records, pos:count, doc:req.body.docid});
	});
});


router.get('/appointment_check', function(req, res, next){
	Bookapt.find({},function(err,entries){
		//console.log(entries)
		for (var i=0; i<entries.length; i++){
		//	console.log("PRINTING ENTRY")
		//	console.log(entries[i])
		}
		if (err) {
			throw err;
			return res.send("ERROR")
		}
		var count = entries.length;
		res.render('bookapt', {params:entries, pos:entries.length});
	});
});

router.get('/appointment/schedule/:uid', function(req, res, next){
	Huser.find({$or:[{role:"doctor"}, {role:"nurse"}]}, function(err, doctors)
		{
			if(err){
				throw err;
				return res.send("ERROR")
			}
			res.render('schedule',{userid:req.params.uid, doc:doctors, cnt:doctors.length});

});
});


router.post('/appointment/schedule/:uid', function(req, res, next){
	var date;

	Bookapt.findOneAndDelete({userid:req.params.uid}, function(err, appointment){

		date = appointment.date;
		var newSchedule = new Schedule({
			username:appointment.username,
			userid:appointment.userid,
			date:appointment.date,
			docname:req.body.docname,
			docid:req.body.docid,
			nursename:req.body.nursename,
			nurseid:req.body.nurseid
		});



		newSchedule.save(
		);
	//	res.redirect('/appointment/check');
		   console.log("Working well")

		var email;

		Huser.findOne({id:req.params.uid}, function(err, user){
			email = user.email;
		});


		var transporter = nodemailer.createTransport({
	        service:'gmail',
       		auth:{
                user:"iCareCheck@gmail.com",
		pass:"Family20@"
		},
		tls:{
		rejectUnauthorized: false
		}
		});

		console.log(email);

		var mailOptions = {
                        from:"iCareCheck@gmail.com",
			to: "sadiqmech68@gmail.com",
			subject: "APPOINTMENT SCHEDULED",
			text: "Dear "+req.params.uid+", "+"Your Appointment has been fixed with Dr "+req.body.docname+" on "+date+"."
		};


		transporter.sendMail(mailOptions, function(err, info){
                if(err) {
			console.log(email);
			console.log("email failed");
			throw err;
			}
                else {console.log("email sent", info.response);
                        console.log("Email Sent");
                }
        });

		res.render('index', {params: {par1: req.params.id}});

	
	});
});


router.get('/addDoctor', function(req,res,next){
res.render('add_doctor');
});


router.get('/nurse_add', function(req,res,next){
	res.render('add_nurse');
});


router.get('/get_bookings', function(req,res,next){
	Schedule.find({}, function(err, appointments){
		if(err) {
			throw err;
			return res.send("ERROR")
		}

		var count = appointments.length;

		res.render('bookings', {params:appointments, pos:count});

	});
});


module.exports = router;
