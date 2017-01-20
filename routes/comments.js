var express = require("express")
var router = express.Router()

var Campground = require("../models/campground")
var Comment = require("../models/comments")

//get the campgrounds by id
router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampGround){
		if(err){
			console.log(err)
		}else{
			var currentUser = req.user.username
			res.render("show", {campgrounds : foundCampGround, currentUser : currentUser})
		}
	});
})

//route to create a new comment and add it to campgrounds
router.post("/campgrounds/:id", isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		}else{
			console.log(req.body.comments)
			Comment.create(req.body.comments, function(err, comment){
				if(err){
					console.log(err)
				}else{
					console.log("New comment username will be : " + req.user.username)
					comment.author.id = req.user._id
					comment.author.username = req.user.username
					comment.save()
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground.id)
				}
			})
		}
	})
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
		res.redirect("/login")
}

module.exports = router