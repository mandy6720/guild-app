var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var User = require('./node-api/models/user');

var app = express();

// Configure app for body parser
//lets us grab data from body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to DB
mongoose.connect('mongodb://mandy6720:Boogers1@ds119598.mlab.com:19598/guildapp');

// API Routes
var router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// MIDDLEWARE -
// Middleware can be very useful for doing validations. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('FYI... Processing inc!');
    next();
});

//Test route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

// Users route
router.route('/users')
  .post(function(req, res) {
    var user = new User(); // new instance of vehicle
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'User was successfully created!'});
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  });

  // User by name
router.route('/users/:user_name')
  .get(function(req, res) {
    User.find({make: req.params.user_name}, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

  
// // Use the BnetStrategy within Passport.
// passport.use(new BnetStrategy({
//     clientID: process.env.BNET_ID,
//     clientSecret: process.env.BNET_SECRET,
//     callbackURL: process.env.PORT + "/auth/bnet/callback",
//     region: "us"
// }, function(accessToken, refreshToken, profile, done) {
//     return done(null, profile);
//     console.log(accessToken, refreshToken, profile, done)
// }));

// // Auth requests
// app.get('/auth/bnet',
//     passport.authenticate('bnet'));

// app.get('/auth/bnet/callback',
//     passport.authenticate('bnet', { failureRedirect: '/' }),
//     function(req, res){
//         res.redirect('/home');
//     });

//Serve files
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = app;
