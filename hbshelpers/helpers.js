var moment = require('moment');

function formatDate(date){
	// Getting the UTC Standard date
	m = moment.utc(date);
	// Format for the current server timezone
	return m.parseZone().format('dddd, MMMM Do YYYY');
}

module.exports = {
	formatDate : formatDate
}