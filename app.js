var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var dotenv = require('dotenv').config();

var cookieParser = require('cookie-parser');
var session = require('express-session');

var BnetStrategy = require('passport-bnet').Strategy;
var User = require('./node-api/models/user');

var isAuthenticated = require('passport').isAuthenticated;


// Passport config
var BNET_ID = process.env.BNET_ID;
var BNET_SECRET = process.env.BNET_SECRET;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



// Use the BnetStrategy within Passport.
passport.use(
  new BnetStrategy({ 
    clientID: BNET_ID,
    clientSecret: BNET_SECRET,
    scope: "wow.profile",
    callbackURL: "https://illidari-shadows.herokuapp.com/auth/bnet/callback" },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
      return done(null, profile);
    });
  })
);

var app = express();

// enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Configure app for body parser
//lets us grab data from body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configure Express
app.use(cookieParser());
app.use(session({ 
  secret: 'blizzard',
  saveUninitialized: true,
  resave: true 
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/auth/bnet',
  passport.authenticate('bnet'));

app.get('/auth/bnet/callback',
  passport.authenticate('bnet', { failureRedirect: '/' }),
  function(req, res){
    res.redirect('/');
  });

//Test route
// router.get('/', function(req, res) {
//   res.json({message: 'Welcome to our API!'});
// });

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
    User.find({username: req.params.user_name}, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

// Current user
router.route('/current_user')
  .get(function(req, res) {
    if (err) {
      res.send(err);
    }  
    var data = {
      data: req.user
    };
    res.send({
        data: data
    });
  });

//Serve files
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
  if(req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/dashboard/dashboard.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public/login/login.html'));
  }
})



module.exports = app;
