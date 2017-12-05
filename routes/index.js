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
			next(err);
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
				next(Error('Bird not found')); //error handler
			}
		})
		.catch( (err) => {
			next(err);
		});
});

module.exports = router;
