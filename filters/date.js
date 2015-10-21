var localeString = ((typeof document !== 'undefined' ? document.documentElement.lang : process.env.NODE_LANG) || 'en').split('-')[0].toLowerCase();

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

function d_Day(date) {
	return locale.days[date.getDay()].slice(0,3);
}

function d_DAY(date) {
	return locale.days[date.getDay()];
}

function d_month(date) {
	return date.getMonth() + 1;
}

function d_Month(date) {
	return locale.months[date.getMonth()].slice(0,3);
}

function d_MONTH(date) {
	return locale.months[date.getMonth()];
}

function factory(fnc) {
	return function(date) {
		if(!_.isDate(date)) date = new Date(date);

		return fnc(date);
	};
}

module.exports = {
	d_DAY: factory(d_DAY),
	d_Day: factory(d_Day),
	d_MONTH: factory(d_MONTH),
	d_Month: factory(d_Month),
	d_date: factory(d_date),
	d_datetime: factory(d_datetime),
	d_datetime_long: factory(d_datetime_long),
	d_day: factory(d_day),
	d_month: factory(d_month),
	d_time: factory(d_time),
};
