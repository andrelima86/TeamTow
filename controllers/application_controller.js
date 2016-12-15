var express = require('express');
var router  = express.Router();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var User = require('../models').User;
var Request = require('../models').Request;


// router.get('/', function(req, res) {
//   res.render('index');
// });



router.get('/', function(req, res) {
  res.render('index');
});

router.post('/geolocator',function(req,res){
	console.log(req.body);
	var userName = req.body.username;
	var lat = req.body.latitude;
	var lng = req.body.longitude;
	User.update({username:userName}, {latitude:lat,longitude:lng,loggedin:true}, 
    function(err, num) {
        console.log("updated "+userName);
    });

})

router.get('/loggedinusers', function(req,res){
	User.find({loggedin : true}, function(err,data) {
		if (err) {
			throw err;
		}
		res.json(data);
	})
})

router.get('/truckUserCoords/:truckName?', function(req,res){
	var truckName = req.params.truckName;
	User.find({username : truckName}, function(err,data){
		res.json(data);
	})
})

router.post('/helpRequest', function(req,res){
	var userRequest = req.body;
	console.log(userRequest);
	 var request = new Request({
   	username: req.body.username,
     latitude: req.body.latitude,
     longitude: req.body.longitude
   })
	  request.save(function(err,post){
	  	if (err) {console.log(err)}
	  	res.send('success');	

	  }) 
})

// router.get('/client', function(req, res) { 
//     res.render('client', {
//         clientId: req.query.clientId
//     });
// });


// app.get('/truck', function(req, res) {
//     res.render('truck', {
//         userId: req.query.userId
//      });
// });


// io.on('connection', function(socket) { //Listen on the 'connection' event for incoming sockets
//     console.log('A user just connected');

//     socket.on('join', function(data) {
//         if(socket.join(data.userId)){
//                     console.log("User joined room: " + data.userId);
//         }
//         if (socket.join(data.clientId)) {
//                     console.log("User joined room: " + data.clientId);
//                 }

//             });

//     routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
//         });



module.exports = router;
