
var locales = require('../util/locales'),
	locale;

function twoDigits(val) {
	return val >= 10 ? val : '0' + val;
}

function dtz_datetime_long(date) {
	return _.compact([
		locale.days[date.getUTCDay()].slice(0,3),
		date.getDate(),
		locale.months[date.getMonth()],
		date.getUTCFullYear(),
		[ date.getUTCHours(),
			date.getUTCMinutes() 
		].map(twoDigits).join(':'),
		date._tz[0]
	]).join(' ');
}

function dtz_datetime(date) {
	return dtz_date(date) + ' ' + dtz_time(date);
}

function dtz_datetime_tz(date) {
	return dtz_datetime(date) + (date._tz[0] ? ' ' + date._tz[0] : '');
}

function dtz_date(date) {
	return [
		date.getUTCFullYear(),
		date.getUTCMonth() + 1,
		date.getUTCDate()
	].map(twoDigits).join('-');
}

function dtz_time(date) {
	return [
		date.getUTCHours(),
		date.getUTCMinutes()
	].map(twoDigits).join(':');
}

function dtz_time_tz(date) {
	return dtz_time(date) + (date._tz[0] ? ' ' + date._tz[0] : '');
}

function dtz_day(date) {
	return date.getUTCDate();
}

function dtz_day_short(date) {
	return locale.days[date.getUTCDay()].slice(0,3);
}

function dtz_day_long(date) {
	return locale.days[date.getUTCDay()];
}

function dtz_month(date) {
	return date.getUTCMonth() + 1;
}

function dtz_month_short(date) {
	return locale.months[date.getUTCMonth()].slice(0,3);
}

function dtz_month_long(date) {
	return locale.months[date.getUTCMonth()];
}

function factory(fnc) {
	return function(date, context) {

		if(!locale) 
			locale = locales[(context.get('lang') || 'en').split('-')[0].toLowerCase()];

		if(!_.isDate(date)) date = new Date(date);

		if(!date._tz) {
			var offset = date.getTimezoneOffset();

			date = new Date(date.getTime() - offset * 60000);

			date._tz = [ '', '', offset ];
		}

		return fnc(date);
	};
}

module.exports = {
	dtz_date: factory(dtz_date),
	dtz_datetime: factory(dtz_datetime),
	dtz_datetime_tz: factory(dtz_datetime_tz),
	dtz_datetime_long: factory(dtz_datetime_long),
	dtz_day: factory(dtz_day),
	dtz_day_short: factory(dtz_day_short),
	dtz_day_long: factory(dtz_day_long),
	dtz_month: factory(dtz_month),
	dtz_month_short: factory(dtz_month_short),
	dtz_month_long: factory(dtz_month_long),
	dtz_time: factory(dtz_time),
	dtz_time_tz: factory(dtz_time_tz)
};
