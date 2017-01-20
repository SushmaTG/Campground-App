//mongoose module to connect to mongodb
var	mongoose = require("mongoose"),
//import Campground model
	Campground = require("./models/campground")
	Comments = require("./models/comments")

var data = [
	{
		name : "Kids Beach Tents",
		image : "https://ae01.alicdn.com/kf/HTB1ecv6KpXXXXbiXVXXq6xXFXXXJ/Cartoon-Creative-Outdoor-Sports-font-b-Kids-b-font-Beach-font-b-Tents-b-font-New.jpg",
		description : "Cartoon Creative Outdoor Sports Kids Beach Tents New Toys Children Game House Portable Folding Cute Camping"
	},
	{
		name : "Mushroom Beach tents",
		image : "http://img.weiku.com/a/016/827/kids_castle_tent_for_ball_pits_mushroom_of_play_tent_3649_9.jpg",
		description : "Popular Creative Camping Tent-Buy Cheap Creative Camping Tent lots New Kids Mushroom Beach tents cartoon creative outdoor sports toys children game house Portable folding"
	},
	{
		name : "mosquito net hammock tent",
		image : "http://g01.a.alicdn.com/kf/HTB1JelMIXXXXXbUXFXXq6xXFXXXE/Outdoor-mosquito-net-hammock-font-b-tent-b-font-family-courtyard-leisure-font-b-creative-b.jpg",
		description : "Outdoor mosquito net hammock tent family courtyard leisure creative parent-child double hammock Outdoor Free"
	}
]

//remove the existing campgrounds
function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err)
		}
		console.log("removed campgrounds")
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err)
				}else{
					console.log(campground)
					Comments.create(
						{
							text : "This place is great, but I wish there was internet",
							author : "Homer"

						}, function(err, comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created comment")
							}
						})
				}
			})
		})
	});
}	

module.exports = seedDB;