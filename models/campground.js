var mongoose = require("mongoose");
//var	comments = require("comments")

//define the schema for the db
var campgroundSchema = new mongoose.Schema({
	name : String,
	image : String,
	description : String,
	author : {
			id : {
				type : mongoose.Schema.Types.ObjectId,
				ref : "User"
			},
			username : String
	},
	comments : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : 'Comment'
		}
	]
});

//define model for the db
module.exports = mongoose.model("Campground", campgroundSchema)
