var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/* schema for the items page that are input */

var itemSchema = new mongoose.Schema({
	
	name: { type:String, required: true,
		unique: true, uniqueCaseInsensitive: true },   //name of the item
	description: String, // what the item is
	quanity: {type: Number, min: 0, max: 400}, // the amount that is there
	storageLocation: String, //where it is stored
	location: String, // where it is if not stored
	dateTaken: [Date], //date loaned out
	whoBarrowed: String // who has the tool
	
});

var Item = mongoose.model('Item', itemSchema);
itemSchema.plugin(uniqueValidator);

module.exports =Item;