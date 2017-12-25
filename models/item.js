var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var ObjectId = mongoose.Schema.Types.ObjectId;

/* schema for the items page that are input */

var itemSchema = new mongoose.Schema({
	
	name: { type:String, 
			required: true,
			unique: true, 
			uniqueCaseInsensitive: true 
			},   //name of the item
	description: String, // what the item is
	quantity: {type: Number, min: 0, max: 400}, // the amount that is there
	storageLocation: String, //where it is stored
	location: String, // where it is if not stored
	dateTaken: [Date], //date loaned out
	whoBarrowed: String, // who has the tool
	
	creator: {type: ObjectId, ref: 'User'} //the user for the item that is in the database
	
});


var Item = mongoose.model('Item', itemSchema);
itemSchema.plugin(uniqueValidator);


module.exports = Item;