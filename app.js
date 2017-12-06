var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('express-flash');
var session = require('express-session');
var hbs = require('hbs');
var helpers = require('./hbshelpers/helpers');
var mongoose = require(mongoose);
var MongoDBStore = require('connect-mongodb-session')(session);
var passport = required('passport');
var passportConfig = require('./config/passport')(passport);

//seting the enivroment varible for the page
var mongo_url = process.env.MONGO_URLINVENTORY;
mongoose.Promise = global.Promise;

// Connect to mongoose, if login is success or error
mongoose.connect(mongo_url, { useMongoClient: true })
	.then( () => { console.log('Connected to MongoDB')})
	.catch( (err) => { console.log('Error connecting to MongoDB', err);});

var items = require('./routes/items');
var auth = require('routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerHelper(helpers) //regiester the Helper function with hbs


/* might be needed???? but i think it doesn't because of passport  */
/* app.use(session({ 
	secret: 'top secret!', 
	resave: false, 
	saveUninitialized: false
	})); */


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var store = MongoDBStore({ uri: mongo_url, collection : 'items_session'});
app.use(session({
	secret:'top secret',
	resave : true,
	saveUninitialized: true,
	store: store
	}));
	
app.use(passport.initialize());
app.use(passport.session());
	
app.use(flash());


app.use('/auth',auth); //order matters
app.use('/', items);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // Invalid objectIDs as a 404
  if (err.kind === 'objectID' && err.name === 'CastError'){
	err.status = 404;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
