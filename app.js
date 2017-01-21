//express module
var express = require("express"),
//body parser module to get the form field variables
	bodyParser = require("body-parser"),
//mongoose module to connect to mongodb
	mongoose = require("mongoose"),
//passport and passport-local module	
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
//import Campground model
	Campground = require("./models/campground"),
//import Comment model
	Comment = require("./models/comments"),	
//import User model	
	User = require("./models/user"),
//import seedDB to load the db
	seedDB = require("./seeds")

//moving all the routes to routes directory and require it
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var authRoutes = require("./routes/auth")
var port = process.env.PORT || CONFIG.port;
	
//	seedDB();

//connecting to the database
//mongoose.connect("mongodb://localhost/campgrounds")
mongoose.connect("mongodb://rusty:rusty@ds117889.mlab.com:17889/myblogapp")

var app = express()

// passport config
app.use(require("express-session")({
	secret : "You got me",
	resave : false,
	saveUninitialized : false
}))

app.set("view engine", "ejs")

//config the css folder
app.use(express.static(__dirname +"/public"));

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:true}))
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//use this function to use the req.user on all the routes
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

app.use(commentRoutes)
app.use(campgroundRoutes)
app.use(authRoutes)

//route to listen on the server port
app.listen(port)