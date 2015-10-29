var timeZones = require('./time-zones');
var dst = require('./dst');
function getTimeZone(date, _timeZone) {
	var tz = timeZones[_timeZone];
	return tz[tz.saving && dst(date) ? 'saving' : 'standard'];
}

exports.getTimeZone = getTimeZone;

exports.factory = function factory(timeZone) {
	timeZone = timeZone || 'Europe/Copenhagen';

	return function(date, context) {
		if(!(date instanceof Date)) date = new Date(date);

		var tz = getTimeZone(date, timeZone);

		date = new Date(date.getTime() + tz[2] * 60000);

		date._tz = tz;

		return date;
	};
};
