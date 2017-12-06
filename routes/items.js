var express = require('express');
var router = express.Router();
var Item = require('../models/item');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	Item.find().select( { name: 1 } ).sort( {name: 1} )
		.then( (docs) => {
			console.log(docs); //helps when trouble shooting
			res.render('index', { title: 'All Items', items: docs });
		}).catch( (err) => {
			next(err)
		});
  
});

/* Get info about items  */
router.get('/item/:_id', function(req,res,next){
	Item.findOne( {_id: req.params._id})
		.then( (doc) => {
			if (doc) {
				res.render('item', {item:doc });
			}
			else{
				res.status(404);
				next(Error('Item not found')); //error handler
			}
		})
		.catch( (err) => {
			next(err);
		});
});

/* POST to creat new item in items collection */
router.post('/addItem', function(req, res, next){
	
	/* using the form data to make a new item and save in db */
	
	var item = Item(req.body);
	item.save()
		.then( (doc) => {
			console.log(doc);
			res.redirect('/')
		})
		.catch( (err) => {
			
			if (err.name === 'ValidationError'){
				//chekcing for validation errors
				//more than one error will be combined into one message
				req.flash('error', err.message);
				res.redirect('/');
			}
			else {
				//generic error handler
				next(err);
			}			
		});
});

/* post to change description for an item. item id is expected in the body */
router.post('/changeDescription', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {description :[req.body.description] } )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change description of a itme not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened in your description');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* post to Quanity for an item. Item id is expected in the body */
router.post('/changeItemQuanity', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {quanity :req.body.quanity } )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this Item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change the quanity of a item not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened to quanity');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* POST to change storageLocation for an item. item id is expected in the body */
router.post('/changeStorageLocation', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {storageLocation :[req.body.storageLocation] } )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change storageLocation of a item not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened in your storageLocation');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* POST to change location for an item. item id is expected in the body */
router.post('/changeBarrowedLocation', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {location :[req.body.location] } )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change location of a item not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened in your location');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* post to change storageLocation for an item. item id is expected in the body */
router.post('/addDateBarrowed', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {dateTaken :req.body.dateTaken }, {runValidators: true} )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change storageLocation of a item not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened in your storageLocation');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* POST to change whoBarrowed for an item. item id is expected in the body */
router.post('/changeWhoBarrowed', function(req, res, next){
	
	
	Item.findOneAndUpdate({_id: req.body._id}, {whoBarrowed :[req.body.whoBarrowed] } )
		.then( (doc) => {
			if (doc) {
				res.redirect('/item/' + req.body._id); //redirects to this item's info page
			}
			else {
				res.status(404); next(Error('Attempt to change whoBarrowed of a item not in database'))
			}
		})
		.catch((err) => {
			console.log(err);			
			if (err.name === 'CastError'){
				req.flash('error', 'Sorry, something happened in your whoBarrowed');
				res.redirect('/item/' + req.body._id);
			}
			else if (err.name === 'ValidationError'){
				req.flash('error', err.message);
				res.redirect('/item/ + req.body._id');
			}
			else {
				next(err);
			}
		});
});

/* Post task to delete an item */
router.post('/delete', function(req, res, next){
	
	Item.deleteOne({_id : req.body._id })
		.then((result) => {
			if (result.deleteCount === 1) {
				res.redirect('/');
			}
			else {
				res.redirect('/');
				res.status(404).send('Error deleting Item: not found');
				
			}
		})
      .catch((err) => {
        next(err);
      });
	
});

module.exports = router;
