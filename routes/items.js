var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var ObjectID = require('mongoose').mongo.ObjectID;

/* Middleware, to verify if the user is authenticated */
function isLoggedIn(req, res, next) {
  console.log('user is auth ', req.user)
  if (req.isAuthenticated()) {
    res.locals.username = req.user.local.username;
    next();
  } else {
    res.redirect('/auth');
  }
}

/* Apply this middleware to every route in the file, so don't need to
specify it for every router */
router.use(isLoggedIn);

/* GET home page. */
router.get('/', function(req, res, next) {
	
	Item.find( {creator:req.user._id} ).sort( {name: 1} )
		.then( (docs) => {
			console.log(docs); //helps when trouble shooting
			res.render('index', { title: 'All Items', items: docs });
		})
		.catch( (err) => {
			next(err)
		});
  
});

/* Get info about items  */
router.get('/item/:_id', function(req,res,next){
	Item.findOne( {creator:req.user._id, _id: req.params._id})
		.then( (item) => {
			if (!item) {
				res.status(404).send('Item Not found'); //error handler
			}
			else if ( req.user._id.equals(item.creator)){
				res.render('item', {title: 'Item', item: item });
			}
			else {				
				//not this user's Item. 403 fornbidden
				res.statue(403).send('This is not one of your items, you can not view it');
			}
		})
		.catch( (err) => {
			next(err);
		});
});

/* POST to creat new item in items collection */
router.post('/addItem', function(req, res, next){
	
	 if (!req.body || !req.body.name) {
    //no item text info, redirect to home page with flash message
    req.flash('error', 'please enter an item');
    res.redirect('/');
  }
  else {

    // Insert into database. New items.

    // Create a new Task, an instance of the Task schema, and call save()
    new Item( { creator: req.user._id, name: req.body.name} ).save()
      .then((newItem) => {
        console.log('The new item created is: ', newItem);
        res.redirect('/');
      })
      .catch((err) => {
		  if (err.name === 'ValidationError'){
				// checks for validation errors
				//if more than one error all will be combined
				req.flash('error', err.message);
				res.redirect('/');
			}
			else {
				//passes a generic error
				next(err);
			}
      });
  }
});

/* post to change description for an item. item id is expected in the body */
router.post('/changeDescription', function(req, res, next){
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {description :[req.body.description] } )
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
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {quanity :req.body.quanity } )
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
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {storageLocation :[req.body.storageLocation] } )
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
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {location :[req.body.location] } )
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
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {dateTaken :req.body.dateTaken }, {runValidators: true} )
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
	
	
	Item.findOneAndUpdate({creator:req.user._id, _id: req.body._id}, {whoBarrowed :[req.body.whoBarrowed] } )
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
	
	Item.deleteOne({creator:req.user._id, _id : req.body._id })
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
