var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")

//read the campgrounds route
router.get("/campgrounds", function(req, res){
	//console.log(req.user)
	var currentUser = req.user
	console.log(currentUser)
	Campground.find({}, function(err, getAllCampGrounds){
		if(err){
			console.log(err)
		}else{
			res.render("campgrounds", { 
				currentUser : currentUser.username,
				campgrounds : getAllCampGrounds
			});
		}
	})
})

//display the form route
router.get("/new", isLoggedIn ,function(req, res){
	res.render("new")
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
		res.redirect("/login")
}

//create route for the campground
router.post("/newCampgrounds", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	var newCampground = {
		name : name, 
		image : image,
		description : desc,
		author : author
	};
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err)
		}else{
			console.log(campground)
			res.redirect("/campgrounds")
		}
	})
})

module.exports = router