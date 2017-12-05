var mongoose = require('mongoose');

/* schema for the items page that are input */

var itemSchema = new mongoose.Schema({
	
	name: String,   //name of the item
	description: String, // what the item is
	quanity: Number, // the amount that is there
	storageLocation: String, //where it is stored
	location: String, // where it is if not stored
	dateTaken: [Date] //date loaned out
	
});

var Item = mongoose.model('Item', itemSchema);

module.exports =Item;