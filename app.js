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

var isAuthenticated = false;
var user, profile;


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
      profile = profile;
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
    isAuthenticated = true;
    user = req.user;
    res.redirect('/');
  });

//Test route
// router.get('/', function(req, res) {
//   res.json({message: 'Welcome to our API!'});
// });

// ROUTES

// Users route
router.route('/users')
  .post(function(req, res) {
    var user = new User(); // new instance of vehicle
    user.bnet_id = req.body.bnet_id;
    user.profile = req.body.profile;

    user.save(function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
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

// User by id
router.route('/users/:user_id')
  .get(function(req, res) {
    User.find({_id: req.params.user_id}, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  })
  .delete( function (req, res) {     
    User.remove({
      _id: req.params.user_id
    }, function (err, user) {
      if (err) return res.send(err);
      res.json({ message: 'Deleted' });
    });
  });

// User by Bnet id
router.route('/users/bnet_id/:id')
  .get(function(req, res) {
    User.find({bnet_id: req.params.id}, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  });

// Login
router.route('/login')
  .get(function(req, res) {
    if (isAuthenticated) {
      var data = {
        user: user
      };
      res.send({data: data.user});
    } else {
      res.send({data: 'nope'})
    }
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
