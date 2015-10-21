var timeZones = require('./time-zones');
var dsts = require('./dsts');

function isDST(date) {
	var weekday = date.getUTCDay(),
		month = date.getUTCMonth() + 1,
		monthday = date.getUTCDate(),
		hour = date.getUTCHours();

	if(month === 3) {
		if(monthday > 24 && monthday + (7 - weekday) >= 31 && (weekday > 0 || hour >= 1))
			return true;

		return false;
	}

	if(month === 10) {
		if(monthday > 24 && monthday + (7 - weekday) >= 31 && (weekday > 0 || hour >= 1))
			return false;

		return true;
	}

	return month > 3 && month < 10;
}

function getTimeZone (date, location) {
	return timeZones[location][isDST(date) ?  'saving' : 'standard'];
}

module.exports = function factory(location) {
	location = location || 'Europe/Copenhagen';

	return function(date, context) {
		if(!(date instanceof Date)) date = new Date(date);

		var tz = getTimeZone(date, location);

		date = new Date(date.getTime() + tz[2] * 60000);

		date._tz = tz;

		return date;
	};
};
