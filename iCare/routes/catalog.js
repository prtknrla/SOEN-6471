var express = require('express');
var router = express.Router();

//Require controller modules
//
var admin_controller = require('../controllers/adminController');


// Admin routes
//
router.get('/', admin_controller.index);


//request for admin home page
//
//router.get('/admin/:id', admin_controller.home);

module.exports = router;
