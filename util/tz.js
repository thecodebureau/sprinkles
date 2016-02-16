var timezones = require('./timezones'),
	dst = require('./dst');

function get(date, timezone) {
	if(_.isString(timezone))
		timezone = timezones[timezone];

	// check if timezone uses DST, and then test if it is in dst
	return timezone[timezone.saving && dst(date) ? 'saving' : 'standard'];
}

exports.get = get;

exports.factory = function factory(timezone) {
	// set default timezone
	timezone = timezone || 'Europe/Copenhagen';

	if(_.isString(timezone))
		timezone = timezones[timezone];

	return function(date, context) {
		if(!(date instanceof Date)) date = new Date(date);

		// get actual timezone (DST or standard time)
		var tz = get(date, timezone);

		// use timezones offset to calculate new date, tz[2] is in minutes, so multiply by 60000 (60 seconds * 10000 milliseconds)
		date = new Date(date.getTime() + tz[2] * 60000);

		// save reference to tz
		date.tz = tz;

		return date;
	};
};
