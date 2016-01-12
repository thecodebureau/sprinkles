var localeString = ((typeof document !== 'undefined' ? document.documentElement.lang : process.env.NODE_LANG || LANG) || 'en').split('-')[0].toLowerCase();

var locale = require('../util/locales')[localeString];

function twoDigits(val) {
	return val >= 10 ? val : '0' + val;
}

function d_datetime_long(date) {
	return [
		locale.days[date.getDay()].slice(0,3),
		date.getDate(),
		locale.months[date.getMonth()],
		date.getFullYear(),
		[ date.getHours(),
			date.getMinutes() 
		].map(twoDigits).join(':')
	].join(' ');
}

function d_datetime(date) {
	return d_date(date) + ' ' + d_time(date);
}

function d_date(date) {
	return [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate()
	].map(twoDigits).join('-');
}

function d_time(date) {
	return [
		date.getHours(),
		date.getMinutes()
	].map(twoDigits).join(':');
}

function d_day(date) {
	return date.getDate();
}

function d_day_short(date) {
	return locale.days[date.getDay()].slice(0,3);
}

function d_day_long(date) {
	return locale.days[date.getDay()];
}

function d_month(date) {
	return date.getMonth() + 1;
}

function d_month_two_digit(date) {
	return twoDigits(date.getMonth() + 1);
}

function d_month_short(date) {
	return locale.months[date.getMonth()].slice(0,3);
}

function d_month_long(date) {
	return locale.months[date.getMonth()];
}

function d_year(date) {
	return date.getFullYear();
}

function factory(fnc) {
	return function(date) {
		if(!_.isDate(date)) date = new Date(date);

		return fnc(date);
	};
}

module.exports = {
	d_date: factory(d_date),
	d_datetime: factory(d_datetime),
	d_datetime_long: factory(d_datetime_long),
	d_day: factory(d_day),
	d_day_long: factory(d_day_long),
	d_day_short: factory(d_day_short),
	d_month: factory(d_month),
	d_month_two_digit: factory(d_month_two_digit),
	d_month_long: factory(d_month_long),
	d_month_short: factory(d_month_short),
	d_year: factory(d_year),
	d_time: factory(d_time)
};
